const { createReminder, listReminders, deleteReminder } = require("../services/reminderService");

const create = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId, title, datetime, description } = req.body;
    const result = await createReminder(userId, groupId, title, datetime, description);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const list = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.params;
    const result = await listReminders(userId, groupId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { reminderId } = req.params;
    const result = await deleteReminder(userId, reminderId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { create, list, remove };