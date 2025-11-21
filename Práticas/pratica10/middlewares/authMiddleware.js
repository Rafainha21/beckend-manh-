const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function verificarToken(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) throw new Error("Token inválido");

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}

function gerarToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  } catch {
    throw new Error("Erro ao gerar o token");
  }
}

function cifrarSenha(senha) {
  const salto = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salto);
  return hash;
}

function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}

module.exports = {
  verificarToken,
  gerarToken,
  cifrarSenha,
  compararSenha,
};
