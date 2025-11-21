require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const usuariosRouter = require("./routes/usuariosRouter");
const apidocsRouter = require("./routes/apidocsRouter");

const app = express();
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro MongoDB:", err));

// Rotas
app.use("/usuarios", usuariosRouter);
app.use("/api-docs", apidocsRouter);

module.exports = app;
