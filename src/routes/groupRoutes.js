const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/authMiddlewares");
const { isAdmin } = require("../middlewares/roleMiddlewares");

const {
  create,
  join,
  leave,
  remove,
  transfer,
  invite,
  joinViaInvite,
} = require("../controllers/groupController");

router.post("/create", verifyToken, create);
router.post("/join", verifyToken, join);
router.post("/leave", verifyToken, leave);
router.delete("/remove-user", verifyToken, isAdmin, remove);
router.post("/transfer-admin", verifyToken, isAdmin, transfer);
router.post("/invite", verifyToken, isAdmin, invite);
router.post("/join-invite", verifyToken, joinViaInvite);

module.exports = router;