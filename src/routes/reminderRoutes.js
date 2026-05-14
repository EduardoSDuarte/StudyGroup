const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddlewares");
const { create, list, remove } = require("../controllers/reminderController");

router.post("/create", verifyToken, create);
router.get("/:groupId", verifyToken, list);
router.delete("/:reminderId", verifyToken, remove);

module.exports = router;