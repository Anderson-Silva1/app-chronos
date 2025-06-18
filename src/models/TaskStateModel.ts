// Importa o tipo TaskModel, que representa a estrutura de uma tarefa individual
import type { TaskModel } from "./TaskModel";

// Define o modelo do estado global que será controlado por useReducer e compartilhado via Context API
export interface TaskStateModel {
  // Lista com todas as tarefas (histórico), incluindo completas, ativas e interrompidas
  tasks: TaskModel[];

  // Contador em segundos indicando quanto tempo falta para terminar a tarefa atual
  secondsRemaining: number;

  // Representação do tempo restante formatado em "MM:SS", usado para exibição
  formattedSecondsRemaining: string;

  // Referência para a tarefa ativa no momento (null se não houver tarefa ativa)
  activeTask: TaskModel | null;

  // Número do ciclo atual, usado para decidir se é hora de uma pausa longa, curta ou de voltar ao foco
  currentCycle: number;

  // Configurações do temporizador, que definem a duração de cada tipo de ciclo em minutos
  config: {
    // Tempo de foco/trabalho
    workTime: number;

    // Tempo de pausa curta
    shortBreakTime: number;

    // Tempo de pausa longa (geralmente após 4 ciclos)
    longBreakTime: number;
  };
}
