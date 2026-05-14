const { db } = require("../config/firebaseAdmin");


// 🔹 INICIAR SESSÃO

const startSession = async (userId, groupId) => {
  // Verifica se o usuário está no grupo
  const memberSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", userId)
    .get();

  if (memberSnap.empty) {
    throw new Error("Usuário não está nesse grupo");
  }

  // Verifica se já tem uma sessão ativa
  const activeSnap = await db.collection("studySessions")
    .where("userId", "==", userId)
    .where("groupId", "==", groupId)
    .where("active", "==", true)
    .get();

  if (!activeSnap.empty) {
    throw new Error("Já existe uma sessão ativa nesse grupo");
  }

  const session = {
    userId,
    groupId,
    startTime: new Date(),
    active: true,
  };

  const docRef = await db.collection("studySessions").add(session);

  return { sessionId: docRef.id, startTime: session.startTime };
};


// 🔹 FINALIZAR SESSÃO

const stopSession = async (userId, groupId) => {
  const snap = await db.collection("studySessions")
    .where("userId", "==", userId)
    .where("groupId", "==", groupId)
    .where("active", "==", true)
    .get();

  if (snap.empty) {
    throw new Error("Nenhuma sessão ativa encontrada");
  }

  const doc = snap.docs[0];
  const session = doc.data();

  const endTime = new Date();
  const duration = Math.floor((endTime - session.startTime.toDate()) / 1000); // em segundos

  // Atualiza a sessão
  await doc.ref.update({
    endTime,
    duration,
    active: false,
  });

  // Acumula o tempo total no groupMembers
  const memberSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", userId)
    .get();

  const memberDoc = memberSnap.docs[0];
  const currentTotal = memberDoc.data().totalStudyTime || 0;

  await memberDoc.ref.update({
    totalStudyTime: currentTotal + duration,
  });

  return { duration, totalStudyTime: currentTotal + duration };
};

module.exports = { startSession, stopSession };