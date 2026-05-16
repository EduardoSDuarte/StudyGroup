const { db } = require("../config/firebaseAdmin");
const { v4: uuidv4 } = require("uuid");
const { sendToGroup } = require("./notificationService");

// 🔹 INICIAR LIGAÇÃO

const startCall = async (userId, groupId) => {
  const memberSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", userId)
    .get();

  if (memberSnap.empty) {
    throw new Error("Usuário não está nesse grupo");
  }

  // Verifica se já tem ligação ativa no grupo
  const activeSnap = await db.collection("activeCalls")
    .where("groupId", "==", groupId)
    .where("active", "==", true)
    .get();

  if (!activeSnap.empty) {
    throw new Error("Já existe uma ligação ativa nesse grupo");
  }

  // Verifica se o usuário já está em outra ligação
  const userCallSnap = await db.collection("activeCalls")
    .where("initiatorId", "==", userId)
    .where("active", "==", true)
    .get();

  if (!userCallSnap.empty) {
    throw new Error("Você já está em uma ligação ativa");
  }

  const roomName = `studygroup-${groupId}-${uuidv4().slice(0, 8)}`;

  const call = {
    groupId,
    initiatorId: userId,
    roomName,
    roomUrl: `https://meet.jit.si/${roomName}`,
    startedAt: new Date(),
    active: true,
  };

  const docRef = await db.collection("activeCalls").add(call);

  // Notifica todos do grupo
  const groupDoc = await db.collection("groups").doc(groupId).get();
  const groupName = groupDoc.data().name;
  await sendToGroup(groupId, "📞 Ligação iniciada!", `${groupName} está em ligação agora. Toque para entrar.`);

  return { callId: docRef.id, ...call };
};

// 🔹 ENCERRAR LIGAÇÃO

const endCall = async (userId, groupId) => {
  const snap = await db.collection("activeCalls")
    .where("groupId", "==", groupId)
    .where("active", "==", true)
    .get();

  if (snap.empty) {
    throw new Error("Nenhuma ligação ativa nesse grupo");
  }

  const doc = snap.docs[0];
  const call = doc.data();

  if (call.initiatorId !== userId) {
    throw new Error("Apenas quem iniciou pode encerrar a ligação");
  }

  await doc.ref.update({ active: false, endedAt: new Date() });

  await sendToGroup(groupId, "📵 Chamada finalizada", "A ligação foi encerrada.");

  return { message: "Ligação encerrada" };
};

// 🔹 VERIFICAR LIGAÇÃO ATIVA

const getActiveCall = async (userId, groupId) => {
  const memberSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", userId)
    .get();

  if (memberSnap.empty) {
    throw new Error("Usuário não está nesse grupo");
  }

  const snap = await db.collection("activeCalls")
    .where("groupId", "==", groupId)
    .where("active", "==", true)
    .get();

  if (snap.empty) {
    return { active: false };
  }

  const call = snap.docs[0].data();
  return { active: true, roomUrl: call.roomUrl, initiatorId: call.initiatorId };
};

module.exports = { startCall, endCall, getActiveCall };