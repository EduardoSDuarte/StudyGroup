const {
  createGroup,
  joinGroup,
  leaveGroup,
  removeUser,
  transferAdmin,
  generateInvite,
  joinByInvite,
} = require("../services/groupService");

//////////////////////////////////////////////////////
// 🔹 CRIAR GRUPO
//////////////////////////////////////////////////////
const create = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.uid;

    const group = await createGroup(userId, name);

    return res.status(201).json(group);
  } catch (error) {
    console.error("ERRO REAL:", error);
    return res.status(500).json({ error: error.message });
  }
};

//////////////////////////////////////////////////////
// 🔹 ENTRAR NO GRUPO
//////////////////////////////////////////////////////
const join = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.body;

    const result = await joinGroup(userId, groupId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//////////////////////////////////////////////////////
// 🔹 SAIR DO GRUPO
//////////////////////////////////////////////////////
const leave = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.body;

    const result = await leaveGroup(userId, groupId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//////////////////////////////////////////////////////
// 🔹 REMOVER USUÁRIO (ADMIN)
//////////////////////////////////////////////////////
const remove = async (req, res) => {
  try {
    const adminId = req.user.uid; // 🔥 pega quem está logado
    const { groupId, userIdToRemove } = req.body;

    const result = await removeUser(adminId, groupId, userIdToRemove);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//////////////////////////////////////////////////////
// 🔹 TRANSFERIR ADMIN (ADMIN)
//////////////////////////////////////////////////////
const transfer = async (req, res) => {
  try {
    const adminId = req.user.uid; // 🔥 pega quem está logado
    const { groupId, newAdminId } = req.body;

    const result = await transferAdmin(adminId, groupId, newAdminId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//////////////////////////////////////////////////////
// 🔻 EXPORT
//////////////////////////////////////////////////////

const invite = async (req, res) => {
  try {
    const adminId = req.user.uid;
    const { groupId } = req.body;
    const result = await generateInvite(adminId, groupId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const joinViaInvite = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { inviteCode } = req.body;
    const result = await joinByInvite(userId, inviteCode);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  create,
  join,
  leave,
  remove,
  transfer,
  invite,
  joinViaInvite,
};