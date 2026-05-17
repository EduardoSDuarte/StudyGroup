const { db } = require("../config/firebaseAdmin");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.body;

    const groupDoc = await db.collection("groups").doc(groupId).get();

    if (!groupDoc.exists) {
      return res.status(404).json({ error: "Grupo não encontrado" });
    }

    const group = groupDoc.data();

    if (group.adminId !== userId) {
      return res.status(403).json({ error: "Apenas admin pode fazer isso" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao verificar permissão" });
  }
};

module.exports = { isAdmin };