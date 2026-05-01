const express = require("express");
const router = express.Router();

console.log("Auth routes carregadas ✅"); 

const { verify } = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddlewares");

// 🔹 rota base (teste)
router.get("/", (req, res) => {
  res.send("Auth funcionando 🔐");
});

// 🔹 verificar usuário autenticado
router.get("/verify", verifyToken, verify);

module.exports = router;