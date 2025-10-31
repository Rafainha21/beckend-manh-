const express = require('express');
const router = express.Router();
const { verificarToken, gerarToken } = require('../middlewares/authMiddleware');

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === 'email@exemplo.com' && senha === 'abcd1234') {
    const token = gerarToken({ email: usuario });
    return res.status(200).json({ token });
  }

  return res.status(401).json({ msg: 'Credenciais inválidas' });
});

router.post('/renovar', verificarToken, (req, res) => {
  const token = gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token });
});

module.exports = router;