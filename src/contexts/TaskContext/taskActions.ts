// Importa apenas o tipo do modelo de uma tarefa, usado no payload das ações
import type { TaskModel } from "../../models/TaskModel";
import type { TaskStateModel } from "../../models/TaskStateModel";

// Define um enum para representar os tipos possíveis de ações no contexto de tarefas
// Esse enum torna o código mais legível, seguro e ajuda a evitar erros de digitação em strings
export enum TaskActionTypes {
  START_TASK = "START_TASK", // Ação para iniciar uma nova tarefa
  INTERRUPT_TASK = "INTERRUPT_TASK", // Ação para interromper a tarefa atual
  RESET_STATE = "RESET_STATE", // Ação para resetar o estado para o valor inicial
  COUNT_DOWN = "COUNT_DOWN", // Ação para resetar o estado para o valor inicial
  COMPLETE_TASK = "COMPLETE_TASK", // Ação para resetar o estado para o valor inicial
  CHANGE_OPTIONS = "CHANGE_OPTIONS",
}

// Define o tipo das ações que carregam um payload (no caso, iniciar uma tarefa)
// Aqui usamos `START_TASK` e fornecemos um objeto do tipo `TaskModel` como dado adicional
export type TaskActionsWithPayload =
  | {
      type: TaskActionTypes.START_TASK; // Identifica o tipo da ação
      payload: TaskModel; // Payload com os dados da nova tarefa a ser iniciada
    }
  | {
      type: TaskActionTypes.COUNT_DOWN; // Identifica o tipo da ação
      payload: { secondsRemaining: number };
    }
  | {
      type: TaskActionTypes.CHANGE_OPTIONS; // Identifica o tipo da ação
      payload: TaskStateModel["config"];
    };

// Define as ações que **não** carregam payloads, ou seja, são simples comandos
export type TaskActionsWithoutPayload =
  | {
      type: TaskActionTypes.RESET_STATE; // Ação para resetar todo o estado do contexto
    }
  | {
      type: TaskActionTypes.INTERRUPT_TASK; // Ação para interromper a tarefa ativa
    }
  | {
      type: TaskActionTypes.COMPLETE_TASK; // Ação para interromper a tarefa ativa
    };

// Une os dois tipos de ações (com e sem payload) em um único tipo que o reducer pode aceitar
// Essa união permite que o `dispatch` trabalhe de forma segura com qualquer uma das ações definidas
export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;
