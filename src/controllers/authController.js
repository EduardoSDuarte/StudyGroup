const { admin, db } = require("../config/firebaseAdmin");
const fetch = require("node-fetch");

const verify = async (req, res) => {
  return res.json({
    message: "Usuário autenticado",
    user: req.user,
  });
};

// 🔹 ALTERAR EMAIL OU SENHA
const updateCredentials = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { newEmail, newPassword } = req.body;

    if (!newEmail && !newPassword) {
      return res.status(400).json({ error: "Informe um novo email ou senha" });
    }

    const updates = {};
    if (newEmail) updates.email = newEmail;
    if (newPassword) updates.password = newPassword;

    await admin.auth().updateUser(userId, updates);

    return res.status(200).json({ message: "Dados atualizados com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// 🔹 RECUPERAR SENHA
const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email é obrigatório" });
    }

    const apiKey = process.env.FIREBASE_API_KEY;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    return res.status(200).json({ message: "Email de recuperação enviado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// 🔹 DELETAR CONTA (RNF29)
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.uid;
    const batch = db.batch();

    const memberships = await db.collection("groupMembers").where("userId", "==", userId).get();
    memberships.forEach(doc => batch.delete(doc.ref));

    const invites = await db.collection("invites").where("createdBy", "==", userId).get();
    invites.forEach(doc => batch.delete(doc.ref));

    const groups = await db.collection("groups").where("adminId", "==", userId).get();
    groups.forEach(doc => batch.delete(doc.ref));

    const requests = await db.collection("joinRequests").where("userId", "==", userId).get();
    requests.forEach(doc => batch.delete(doc.ref));

    const sessions = await db.collection("studySessions").where("userId", "==", userId).get();
    sessions.forEach(doc => batch.delete(doc.ref));

    const daily = await db.collection("dailyStudyTime").where("userId", "==", userId).get();
    daily.forEach(doc => batch.delete(doc.ref));

    const monthly = await db.collection("monthlyStudyTime").where("userId", "==", userId).get();
    monthly.forEach(doc => batch.delete(doc.ref));

    const rankingHistory = await db.collection("rankingHistory").where("userId", "==", userId).get();
    rankingHistory.forEach(doc => batch.delete(doc.ref));

    const summaries = await db.collection("summaries").where("userId", "==", userId).get();
    summaries.forEach(doc => batch.delete(doc.ref));

    const comments = await db.collection("summaryComments").where("userId", "==", userId).get();
    comments.forEach(doc => batch.delete(doc.ref));

    const reminders = await db.collection("reminders").where("userId", "==", userId).get();
    reminders.forEach(doc => batch.delete(doc.ref));

    const tokens = await db.collection("userTokens").where("userId", "==", userId).get();
    tokens.forEach(doc => batch.delete(doc.ref));

    const calls = await db.collection("activeCalls").where("initiatorId", "==", userId).get();
    calls.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
    await admin.auth().deleteUser(userId);

    return res.status(200).json({ message: "Conta e todos os dados deletados com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { verify, updateCredentials, resetPassword, deleteAccount };