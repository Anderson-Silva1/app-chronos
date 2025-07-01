// Importa o tipo do modelo do estado do contexto de tarefas (tipagem do `state`)
import { showMessage } from "../../adapters/showMessage";
import type { TaskStateModel } from "../../models/TaskStateModel";

// Importa função utilitária para formatar segundos em "MM:SS"
import { formatSeccondsToMinuts } from "../../utils/formatSeccondsToMinuts";

// Importa função utilitária que determina o próximo ciclo com base no ciclo atual
import { getNextCycle } from "../../utils/getNextCycle";
import { initialTaskState } from "./initialTaskState";

// Importa os tipos de ação válidos e o modelo de ação (com e sem payload)
import { TaskActionTypes, type TaskActionModel } from "./taskActions";

// Define o reducer principal que controla toda a lógica de atualização do estado
// Recebe o estado atual e uma ação (com tipo e possivelmente payload)
// Retorna o novo estado após aplicar as regras da ação
export const taskReducer = (
  state: TaskStateModel,
  action: TaskActionModel
): TaskStateModel => {
  // Estrutura de controle que escolhe qual lógica aplicar com base no tipo da ação
  switch (action.type) {
    // Ação para iniciar uma nova tarefa (foco ou pausa)
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload; // Nova tarefa recebida no payload

      // Calcula o próximo tipo de ciclo baseado no ciclo atual (ex: de foco para pausa)
      const nextCycle = getNextCycle(state.currentCycle);

      // Converte a duração da tarefa (em minutos) para segundos
      const secondsRemaining = newTask.duration * 60;

      // Retorna o novo estado atualizado com a nova tarefa ativa

      return {
        ...state, // Mantém o restante do estado inalterado
        activeTask: newTask, // Define a tarefa ativa
        currentCycle: nextCycle, // Atualiza o ciclo para o próximo
        secondsRemaining, // Define o tempo restante da tarefa em segundos
        formattedSecondsRemaining: formatSeccondsToMinuts(secondsRemaining), // Formata para exibição (ex: 25:00)
        tasks: [...state.tasks, newTask], // Adiciona a nova tarefa no histórico
      };
    }

    // Ação para interromper a tarefa ativa
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state, // Mantém o restante do estado inalterado
        activeTask: null, // Remove a tarefa ativa
        secondsRemaining: 0, // Zera o tempo restante
        formattedSecondsRemaining: "00:00", // Zera o formato do tempo
        tasks: state.tasks.map((task) => {
          // Verifica se a tarefa sendo iterada é a tarefa que estava ativa
          if (state.activeTask?.id === task.id) {
            // Marca a data de interrupção como o timestamp atual
            return { ...task, interruptDate: Date.now() };
          }
          return task; // Retorna a tarefa sem alterações se não for a ativa
        }),
      };
    }

    case TaskActionTypes.COMPLETE_TASK: {
      showMessage.dismiss();
      showMessage.success("Tarefa completada");

      return {
        ...state, // Mantém o restante do estado inalterado
        activeTask: null, // Remove a tarefa ativa
        secondsRemaining: 0, // Zera o tempo restante
        formattedSecondsRemaining: "00:00", // Zera o formato do tempo
        tasks: state.tasks.map((task) => {
          // Verifica se a tarefa sendo iterada é a tarefa que estava ativa
          if (state.activeTask?.id === task.id) {
            // Marca a data de interrupção como o timestamp atual
            return { ...task, completeDate: Date.now() };
          }
          return task; // Retorna a tarefa sem alterações se não for a ativa
        }),
      };
    }

    case TaskActionTypes.COUNT_DOWN: {
      const secondsRemaining = action.payload.secondsRemaining;

      return {
        ...state, // Mantém o restante do estado inalterado
        secondsRemaining,
        formattedSecondsRemaining: formatSeccondsToMinuts(secondsRemaining), // Zera o formato do tempo
      };
    }

    // Ação para resetar o estado (poderia futuramente voltar ao estado inicial, mas aqui está neutra)
    case TaskActionTypes.RESET_STATE: {
      return { ...initialTaskState }; // Retorna o estado atual (sem alteração). Pode ser ajustado para retornar o estado inicial.
    }

    case TaskActionTypes.CHANGE_OPTIONS: {
      console.log(action);
      return {
        ...state,
        config: {
          ...action.payload,
        },
      };
    }
  }

  // Se nenhuma ação for reconhecida, retorna o estado atual por segurança
  return { ...state };
};
