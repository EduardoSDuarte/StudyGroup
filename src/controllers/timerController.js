const { startSession, stopSession } = require("../services/timerService");

const start = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.body;
    const result = await startSession(userId, groupId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const stop = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.body;
    const result = await stopSession(userId, groupId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { start, stop };