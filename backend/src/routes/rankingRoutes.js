const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddlewares");
const { ranking, history } = require("../controllers/rankingController");

router.get("/:groupId", verifyToken, ranking);
router.get("/history/:groupId", verifyToken, history);

module.exports = router;