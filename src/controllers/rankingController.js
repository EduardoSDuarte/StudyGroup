const { getRanking } = require("../services/rankingService");

const ranking = async (req, res) => {
  try {
    const { groupId } = req.params;
    const result = await getRanking(groupId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { ranking };