const express = require("express");
const router = express.Router();

console.log("Auth routes carregadas ✅");

const { verify, updateCredentials, resetPassword, deleteAccount } = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddlewares");

router.get("/", (req, res) => {
  res.send("Auth funcionando 🔐");
});

router.get("/verify", verifyToken, verify);
router.put("/update", verifyToken, updateCredentials);
router.post("/reset-password", resetPassword);
router.delete("/delete-account", verifyToken, deleteAccount);

// 🔹 Política de privacidade (pública, sem token)
router.get("/privacy-policy", (req, res) => {
  return res.status(200).json({
    version: "1.0",
    lastUpdated: "2026-05-01",
    policy: `
      POLÍTICA DE PRIVACIDADE — StudyGroup

      1. DADOS COLETADOS
      Coletamos email, senha (criptografada) e tempo de estudo para funcionamento do app.

      2. USO DOS DADOS
      Seus dados são usados exclusivamente para autenticação, rankings e funcionalidades do grupo.

      3. COMPARTILHAMENTO
      Seus dados não são compartilhados com terceiros.

      4. EXCLUSÃO DE DADOS
      Você pode solicitar a exclusão definitiva da sua conta e todos os seus dados a qualquer momento.

      5. LGPD
      Este sistema está em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).

      6. CONTATO
      Dúvidas: contato@studygroup.com
    `
  });
});

module.exports = router;