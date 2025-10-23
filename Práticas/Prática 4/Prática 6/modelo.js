import { conectarDb } from "./database.js";
import { ObjectId } from "mongodb";
export class Tarefa {
  db = null;
  collection = null;
  id = null;
  nome = "";
  concluida = false;
  constructor(nome, concluida = false) {
    this.nome = nome;
    this.concluida = concluida;
  }
  async init() {
    this.db = await conectarDb();
    this.collection = this.db.collection("tarefas");
  }
  async inserir() {
    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });
    this.id = resultado.insertedId;
    console.log(`Tarefa inserida com ID: ${this.id}`);
  }
  async alterar() {
    if (!this.id) {
      console.log("ID não definido. Buscando tarefa antes de alterar...");
      await this.buscar();
    }
    await this.collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
    console.log("Tarefa atualizada com sucesso!");
  }
  async deletar() {
    await this.collection.deleteOne({ nome: this.nome });
    console.log(`Tarefa '${this.nome}' removida!`);
  }
  async buscar() {
    const resultado = await this.collection.findOne({ nome: this.nome });
    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
      console.log(`🔍 Tarefa encontrada: ${this.nome}`);
    } else {
      console.log(`❌ Nenhuma tarefa encontrada com o nome '${this.nome}'`);
    }
  }
}  