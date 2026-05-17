const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddlewares");
const { start, stop } = require("../controllers/timerController");

router.post("/start", verifyToken, start);
router.post("/stop", verifyToken, stop);

module.exports = router;