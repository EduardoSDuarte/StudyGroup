const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddlewares");
const { create, list, detail, comment, remove } = require("../controllers/summaryController");

router.post("/create", verifyToken, create);
router.get("/:groupId", verifyToken, list);
router.get("/detail/:summaryId", verifyToken, detail);
router.post("/:summaryId/comment", verifyToken, comment);
router.delete("/:summaryId", verifyToken, remove);

module.exports = router;