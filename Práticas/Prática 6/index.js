import readline from "readline-sync";
import * as controlador from "./controlador.js";
function menu() {
  console.log("=== MENU PRINCIPAL ===");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");
}
async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1":
      const nomeAdd = readline.question("Nome da tarefa: ");
      await controlador.adicionarTarefa(nomeAdd);
      break;
    case "2":
      const nomeBusca = readline.question("Nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nomeBusca);
      if (tarefa && tarefa.id) {
        console.log(`Nome: ${tarefa.nome}`);
        console.log(`Concluída: ${tarefa.concluida}`);
      }
      break;
    case "3":
      const nomeAtualiza = readline.question("Nome da tarefa: ");
      const concluida = readline.question("Concluída? (true/false): ");
      await controlador.atualizarTarefa(nomeAtualiza, concluida);
      break;
    case "4":
      const nomeDel = readline.question("Nome da tarefa: ");
      await controlador.removerTarefa(nomeDel);
      break;
    case "5":
      console.log("Encerrando o programa...");
      process.exit();
      break;
    default:
      console.log("Opção inválida! Tente novamente.");
  }
}
async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opção: ");
    await escolherOpcao(opcao);
  }
}
main();