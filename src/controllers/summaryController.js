const { createSummary, listSummaries, getSummary, commentSummary, deleteSummary } = require("../services/summaryService");

const create = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId, title, content } = req.body;
    const result = await createSummary(userId, groupId, title, content);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.params;
    const result = await listSummaries(userId, groupId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const detail = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { summaryId } = req.params;
    const result = await getSummary(userId, summaryId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const comment = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { summaryId } = req.params;
    const { text } = req.body;
    const result = await commentSummary(userId, summaryId, text);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { summaryId } = req.params;
    const result = await deleteSummary(userId, summaryId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { create, list, detail, comment, remove };