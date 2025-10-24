import { MongoClient } from "mongodb";
const url = "mongodb+srv://rafael_user:Rafa1234!@cluster01.ae2xve0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
export async function conectarDb() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");
    return client.db("agenda"); 
  } catch (erro) {
    console.error("Erro ao conectar ao MongoDB:", erro);
  }
}