const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

exports.criar = async (req, res) => {
  try {
    const { nome, preco } = req.body;
    if (!nome || !preco) throw new Error();
    const novoProduto = await Produto.create({ nome, preco });
    res.status(201).json(novoProduto);
  } catch {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
};

exports.listar = async (req, res) => {
  const produtosCadastrados = await Produto.find({});
  res.status(200).json(produtosCadastrados);
};

exports.buscar = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Parâmetro inválido" });
  }

  const produtoEncontrado = await Produto.findById(id);
  if (!produtoEncontrado) {
    return res.status(404).json({ msg: "Produto não encontrado" });
  }

  req.produto = produtoEncontrado;
  next();
};

exports.exibir = (req, res) => {
  res.status(200).json(req.produto);
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, preco } = req.body;
    if (!nome || !preco) throw new Error();

    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      { nome, preco },
      { new: true, runValidators: true }
    );
    res.status(200).json(produtoAtualizado);
  } catch {
    res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
};

exports.remover = async (req, res) => {
  await Produto.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
