import { Tarefa } from "./modelo.js";
export async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.inserir();
}
export async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  return tarefa;
}
export async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  if (tarefa.id) {
    tarefa.concluida = concluida === "true" || concluida === true;
    await tarefa.alterar();
  } else {
    console.log("Tarefa não encontrada para atualização.");
  }
}
export async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  if (tarefa.id) {
    await tarefa.deletar();
  } else {
    console.log("Tarefa não encontrada para remoção.");
  }
}