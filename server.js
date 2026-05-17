require("dotenv").config();
const app = require("./src/app");
require("./src/services/cronService");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});