const { admin, db } = require("../config/firebaseAdmin");

// 🔹 BUSCA TOKEN E ENVIA NOTIFICAÇÃO PARA UM USUÁRIO

const sendToUser = async (userId, title, body) => {
  const tokenSnap = await db.collection("userTokens")
    .where("userId", "==", userId)
    .get();

  if (tokenSnap.empty) return;

  const token = tokenSnap.docs[0].data().fcmToken;

  await admin.messaging().send({
    token,
    notification: { title, body },
  });
};

// 🔹 ENVIA NOTIFICAÇÃO PARA TODOS DO GRUPO

const sendToGroup = async (groupId, title, body) => {
  const membersSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .get();

  if (membersSnap.empty) return;

  const promises = membersSnap.docs.map(doc =>
    sendToUser(doc.data().userId, title, body)
  );

  await Promise.allSettled(promises);
};

module.exports = { sendToUser, sendToGroup };