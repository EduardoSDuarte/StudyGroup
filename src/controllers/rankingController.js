const { getRanking, getRankingHistory } = require("../services/rankingService");

const ranking = async (req, res) => {
  try {
    const { groupId } = req.params;
    const result = await getRanking(groupId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const history = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { groupId } = req.params;
    const result = await getRankingHistory(userId, groupId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { ranking, history };