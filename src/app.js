const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");

const app = express();

console.log("App carregado ✅"); 

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use("/auth", authRoutes);
app.use("/group", groupRoutes);

module.exports = app;