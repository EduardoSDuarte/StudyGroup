const verify = async (req, res) => {
  return res.json({
    message: "Usuário autenticado",
    user: req.user,
  });
};

module.exports = { verify };