const { db } = require("../config/firebaseAdmin");

// 🔹 CRIAR LEMBRETE

const createReminder = async (userId, groupId, title, datetime, description) => {
  const memberSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", userId)
    .get();

  if (memberSnap.empty) {
    throw new Error("Usuário não está nesse grupo");
  }

  if (!title || !datetime) {
    throw new Error("Título e data/hora são obrigatórios");
  }

  const reminder = {
    userId,
    groupId,
    title,
    datetime: new Date(datetime),
    description: description || null,
    createdAt: new Date(),
  };

  const docRef = await db.collection("reminders").add(reminder);
  return { reminderId: docRef.id, ...reminder };
};

// 🔹 LISTAR LEMBRETES DO GRUPO

const listReminders = async (userId, groupId) => {
  const memberSnap = await db.collection("groupMembers")
    .where("groupId", "==", groupId)
    .where("userId", "==", userId)
    .get();

  if (memberSnap.empty) {
    throw new Error("Usuário não está nesse grupo");
  }

  const snap = await db.collection("reminders")
    .where("groupId", "==", groupId)
    .get();

  const reminders = snap.docs.map(doc => ({
    reminderId: doc.id,
    ...doc.data()
  }));

  // Ordena pelo mais próximo primeiro
  reminders.sort((a, b) => a.datetime.toDate() - b.datetime.toDate());

  return reminders;
};

// 🔹 DELETAR LEMBRETE

const deleteReminder = async (userId, reminderId) => {
  const doc = await db.collection("reminders").doc(reminderId).get();

  if (!doc.exists) {
    throw new Error("Lembrete não encontrado");
  }

  const reminder = doc.data();

  // Verifica se é o criador
  if (reminder.userId === userId) {
    await doc.ref.delete();
    return { message: "Lembrete deletado" };
  }

  // Verifica se é admin do grupo
  const groupDoc = await db.collection("groups").doc(reminder.groupId).get();
  if (groupDoc.data().adminId === userId) {
    await doc.ref.delete();
    return { message: "Lembrete deletado pelo admin" };
  }

  throw new Error("Sem permissão para deletar esse lembrete");
};

module.exports = { createReminder, listReminders, deleteReminder };