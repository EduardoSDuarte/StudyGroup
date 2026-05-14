const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddlewares");
const { ranking } = require("../controllers/rankingController");

router.get("/:groupId", verifyToken, ranking);

module.exports = router;