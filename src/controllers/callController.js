const { startCall, endCall, getActiveCall } = require("../services/callService");

const start = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.body;
    const result = await startCall(userId, groupId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const end = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.body;
    const result = await endCall(userId, groupId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const active = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.params;
    const result = await getActiveCall(userId, groupId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { start, end, active };