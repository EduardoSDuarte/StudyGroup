const { db } = require("../config/firebaseAdmin");

const getRanking = async (groupId) => {
  const snap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .get();

  if (snap.empty) {
    throw new Error("Grupo não encontrado ou sem membros");
  }

  const members = snap.docs.map(doc => {
    const data = doc.data();
    return {
      userId: data.userId,
      role: data.role,
      totalStudyTime: data.totalStudyTime || 0,
    };
  });

  // Ordena do maior tempo para o menor
  members.sort((a, b) => b.totalStudyTime - a.totalStudyTime);

  // Adiciona a posição
  return members.map((member, index) => ({
    position: index + 1,
    ...member,
  }));
};

module.exports = { getRanking };