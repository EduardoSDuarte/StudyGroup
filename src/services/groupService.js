const { db } = require("../config/firebaseAdmin");
const { v4: uuidv4 } = require("uuid");

//////////////////////////////////////////////////////
// 🔹 CREATE GROUP
//////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////
// 🔹 JOIN GROUP
//////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////
// 🔹 LEAVE GROUP
//////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////
// 🔹 REMOVE USER (ADMIN ONLY)
//////////////////////////////////////////////////////

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

  return { message: "Usuário removido" };
};

//////////////////////////////////////////////////////
// 🔹 TRANSFER ADMIN
//////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////
// 🔻 EXPORTS
//////////////////////////////////////////////////////

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

  await db.collection("groupMembers").add({
    groupId: invite.groupId,
    userId,
    role: "member",
  });

  await inviteDoc.ref.update({ used: true });

  return { message: "Entrou no grupo via convite", groupId: invite.groupId };
};

module.exports = {
  createGroup,
  joinGroup,
  leaveGroup,
  removeUser,
  transferAdmin,
  generateInvite,
  joinByInvite,
};