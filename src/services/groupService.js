const { db } = require("../config/firebaseAdmin");
const { v4: uuidv4 } = require("uuid");
const { sendToUser, sendToGroup } = require("./notificationService");

// 🔹 CREATE GROUP

const createGroup = async (userId, name) => {
  const groupId = uuidv4();

  const group = {
    id: groupId,
    name,
    adminId: userId,
    createdAt: new Date(),
  };

  await db.collection("groups").doc(groupId).set(group);

  await db.collection("groupMembers").add({
    groupId,
    userId,
    role: "admin",
  });

  return group;
};

// 🔹 JOIN GROUP

const joinGroup = async (userId, groupId) => {
  const groupDoc = await db.collection("groups").doc(groupId).get();

  if (!groupDoc.exists) {
    throw new Error("Grupo não existe");
  }

  // 🔒 evita entrar duas vezes
  const existing = await db
    .collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", userId)
    .get();

  if (!existing.empty) {
    throw new Error("Usuário já está no grupo");
  }

  await db.collection("groupMembers").add({
    groupId,
    userId,
    role: "member",
  });

  return { message: "Entrou no grupo" };
};

// 🔹 LEAVE GROUP

const leaveGroup = async (userId, groupId) => {
  // Verifica se é o admin tentando sair
  const groupDoc = await db.collection("groups").doc(groupId).get();
  if (groupDoc.exists && groupDoc.data().adminId === userId) {
    throw new Error("Admin não pode sair sem transferir o cargo primeiro");
  }

  const snapshot = await db
    .collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", userId)
    .get();

  if (snapshot.empty) {
    throw new Error("Usuário não está no grupo");
  }

  snapshot.forEach(doc => doc.ref.delete());
  return { message: "Saiu do grupo" };
};

// 🔹 REMOVE USER (ADMIN ONLY)

const removeUser = async (adminId, groupId, userIdToRemove) => {
  const groupRef = db.collection("groups").doc(groupId);
  const group = await groupRef.get();

  if (!group.exists) {
    throw new Error("Grupo não existe");
  }

  if (group.data().adminId !== adminId) {
    throw new Error("Apenas admin pode remover");
  }

  const snapshot = await db
    .collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", userIdToRemove)
    .get();

  if (snapshot.empty) {
    throw new Error("Usuário não encontrado no grupo");
  }

  snapshot.forEach(doc => doc.ref.delete());

  await sendToUser(userIdToRemove, "❌ Removido do grupo", "Você foi removido do grupo pelo administrador.");

  return { message: "Usuário removido" };
};

// 🔹 TRANSFER ADMIN

const transferAdmin = async (adminId, groupId, newAdminId) => {
  const groupRef = db.collection("groups").doc(groupId);
  const group = await groupRef.get();

  if (!group.exists) throw new Error("Grupo não existe");
  if (group.data().adminId !== adminId) throw new Error("Apenas admin pode transferir");

  // ✅ Atualiza o adminId no grupo
  await groupRef.update({ adminId: newAdminId });

  // ✅ Atualiza role do novo admin
  const newAdminSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", newAdminId)
    .get();
  newAdminSnap.forEach(doc => doc.ref.update({ role: "admin" }));

  // ✅ Rebaixa o antigo admin para member
  const oldAdminSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", adminId)
    .get();
  oldAdminSnap.forEach(doc => doc.ref.update({ role: "member" }));

  return { message: "Admin transferido" };
};

// 🔻 EXPORTS

const generateInvite = async (adminId, groupId) => {
  const groupDoc = await db.collection("groups").doc(groupId).get();
  if (!groupDoc.exists) throw new Error("Grupo não existe");
  if (groupDoc.data().adminId !== adminId) throw new Error("Apenas admin pode gerar convite");

  const inviteCode = uuidv4().slice(0, 8).toUpperCase();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await db.collection("invites").add({
    groupId,
    code: inviteCode,
    createdBy: adminId,
    expiresAt,
    used: false,
  });

  return { inviteCode, expiresAt };
};

const joinByInvite = async (userId, inviteCode) => {
  const snapshot = await db.collection("invites")
    .where("code", "==", inviteCode)
    .where("used", "==", false)
    .get();

  if (snapshot.empty) throw new Error("Convite inválido ou expirado");

  const inviteDoc = snapshot.docs[0];
  const invite = inviteDoc.data();

  if (invite.expiresAt.toDate() < new Date()) throw new Error("Convite expirado");

  const existing = await db.collection("groupMembers")
    .where("groupId", "==", invite.groupId)
    .where("userId", "==", userId)
    .get();
  if (!existing.empty) throw new Error("Usuário já está no grupo");

  // 🔹 Cria solicitação pendente ao invés de entrar direto
  await db.collection("joinRequests").add({
    groupId: invite.groupId,
    userId,
    status: "pending",
    createdAt: new Date(),
  });

  // 🔹 Notifica o admin
  const groupDoc = await db.collection("groups").doc(invite.groupId).get();
  const adminId = groupDoc.data().adminId;
  await sendToUser(adminId, "👥 Solicitação de entrada!", "Um usuário quer entrar no seu grupo. Acesse para aprovar ou recusar.");

  return { message: "Solicitação enviada, aguarde aprovação do admin." };
};
//////////////////////////////////////////////////////
// 🔹 APROVAR SOLICITAÇÃO
//////////////////////////////////////////////////////
const approveRequest = async (adminId, requestId) => {
  const requestRef = db.collection("joinRequests").doc(requestId);
  const requestDoc = await requestRef.get();

  if (!requestDoc.exists) throw new Error("Solicitação não encontrada");

  const request = requestDoc.data();

  const groupDoc = await db.collection("groups").doc(request.groupId).get();
  if (groupDoc.data().adminId !== adminId) throw new Error("Apenas admin pode aprovar");

  if (request.status !== "pending") throw new Error("Solicitação já foi processada");

  await db.collection("groupMembers").add({
    groupId: request.groupId,
    userId: request.userId,
    role: "member",
  });

  await requestRef.update({ status: "approved" });

  await sendToUser(request.userId, "✅ Solicitação aprovada!", "Você foi aceito no grupo.");

  return { message: "Usuário aprovado" };
};

//////////////////////////////////////////////////////
// 🔹 RECUSAR SOLICITAÇÃO
//////////////////////////////////////////////////////
const rejectRequest = async (adminId, requestId) => {
  const requestRef = db.collection("joinRequests").doc(requestId);
  const requestDoc = await requestRef.get();

  if (!requestDoc.exists) throw new Error("Solicitação não encontrada");

  const request = requestDoc.data();

  const groupDoc = await db.collection("groups").doc(request.groupId).get();
  if (groupDoc.data().adminId !== adminId) throw new Error("Apenas admin pode recusar");

  if (request.status !== "pending") throw new Error("Solicitação já foi processada");

  await requestRef.update({ status: "rejected" });

  await sendToUser(request.userId, "❌ Solicitação recusada!", "Sua solicitação de entrada no grupo foi recusada.");

  return { message: "Solicitação recusada" };
};

module.exports = {
  createGroup,
  joinGroup,
  leaveGroup,
  removeUser,
  transferAdmin,
  generateInvite,
  joinByInvite,
  approveRequest,
  rejectRequest,
};