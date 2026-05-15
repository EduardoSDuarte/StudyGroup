const { db } = require("../config/firebaseAdmin");

// 🔹 RANKING DO MÊS ATUAL

const getRanking = async (groupId) => {
  const month = new Date().toISOString().slice(0, 7);

  const membersSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .get();

  if (membersSnap.empty) {
    throw new Error("Grupo não encontrado ou sem membros");
  }

  const ranking = await Promise.all(membersSnap.docs.map(async (doc) => {
    const userId = doc.data().userId;
    const monthlyKey = `${userId}_${groupId}_${month}`;
    const monthlyDoc = await db.collection("monthlyStudyTime").doc(monthlyKey).get();

    return {
      userId,
      role: doc.data().role,
      totalTime: monthlyDoc.exists ? monthlyDoc.data().totalTime || 0 : 0,
    };
  }));

  ranking.sort((a, b) => b.totalTime - a.totalTime);

  return ranking.map((member, index) => ({
    position: index + 1,
    ...member,
  }));
};

// 🔹 HISTÓRICO ANUAL PESSOAL

const getRankingHistory = async (userId, groupId) => {
  const year = new Date().getFullYear();

  const snap = await db.collection("rankingHistory")
    .where("userId", "==", userId)
    .where("groupId", "==", groupId)
    .where("year", "==", year)
    .get();

  if (snap.empty) {
    return [];
  }

  const history = snap.docs.map(doc => doc.data());
  history.sort((a, b) => a.month.localeCompare(b.month));

  return history;
};

module.exports = { getRanking, getRankingHistory };