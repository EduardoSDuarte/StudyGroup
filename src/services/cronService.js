const cron = require("node-cron");
const { db } = require("../config/firebaseAdmin");

// 🔹 TODO DIA À MEIA-NOITE — zera tempo diário

cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Zerando tempos diários...");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const snap = await db.collection("dailyStudyTime")
    .where("date", "==", yesterdayStr)
    .get();

  const batch = db.batch();
  snap.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();

  console.log(`✅ Tempos do dia ${yesterdayStr} apagados.`);
});

// 🔹 ÚLTIMO DIA DO MÊS À MEIA-NOITE — fecha ranking

cron.schedule("0 0 * * *", async () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  if (today.getDate() !== lastDayOfMonth) return;

  console.log("🏆 Fechando ranking do mês...");

  const month = today.toISOString().slice(0, 7);
  const year = today.getFullYear();

  // Busca todos os grupos
  const groupsSnap = await db.collection("groups").get();

  for (const groupDoc of groupsSnap.docs) {
    const groupId = groupDoc.id;

    // Busca membros do grupo
    const membersSnap = await db.collection("groupMembers")
      .where("groupId", "==", groupId)
      .get();

    const ranking = await Promise.all(membersSnap.docs.map(async (doc) => {
      const userId = doc.data().userId;
      const monthlyKey = `${userId}_${groupId}_${month}`;
      const monthlyDoc = await db.collection("monthlyStudyTime").doc(monthlyKey).get();

      return {
        userId,
        totalTime: monthlyDoc.exists ? monthlyDoc.data().totalTime || 0 : 0,
      };
    }));

    // Ordena e salva posição de cada membro
    ranking.sort((a, b) => b.totalTime - a.totalTime);

    for (let i = 0; i < ranking.length; i++) {
      const { userId, totalTime } = ranking[i];

      await db.collection("rankingHistory").add({
        userId,
        groupId,
        month,
        year,
        position: i + 1,
        totalTime,
      });
    }

    console.log(`✅ Ranking do grupo ${groupId} salvo.`);
  }
});

module.exports = {};