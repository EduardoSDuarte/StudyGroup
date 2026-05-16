const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddlewares");
const { start, end, active } = require("../controllers/callController");

router.post("/start", verifyToken, start);
router.post("/end", verifyToken, end);
router.get("/active/:groupId", verifyToken, active);

module.exports = router;