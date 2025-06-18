// Importa apenas os tipos (não o conteúdo real) do modelo de tarefa
import type { TaskModel } from "../models/TaskModel";

// Importa o tipo do estado do contexto de tarefas
import type { TaskStateModel } from "../models/TaskStateModel";

// Define a tipagem das props que o componente `Tips` vai receber
interface TipsProps {
  state: TaskStateModel; // Estado global atual das tarefas (usado para acessar config e activeTask)
  nextCycleType: TaskModel["type"]; // Tipo do próximo ciclo (workTime, shortBreakTime ou longBreakTime)
}

// Componente funcional `Tips` que exibe dicas na tela com base no estado da tarefa atual
const Tips = ({ nextCycleType, state }: TipsProps) => {
  // Dicas exibidas quando há uma tarefa ativa (usuário está em atividade ou em pausa)
  const tipsForWhenActiveTask = {
    // Dica durante o tempo de foco
    workTime: <span>Foque por {state.config.workTime}min</span>,

    // Dica durante o tempo de pausa curta
    shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,

    // Dica durante o tempo de pausa longa
    longBreakTime: <span>Descanse por {state.config.longBreakTime}min</span>,
  };

  // Dicas exibidas quando **não há** uma tarefa ativa (usuário está entre ciclos)
  const tipsForNoActiveTask = {
    // Próxima tarefa será de foco
    workTime: <span>Próximo: foco por {state.config.workTime}min</span>,

    // Próxima tarefa será uma pausa curta
    shortBreakTime: (
      <span>Próximo: descanso por {state.config.shortBreakTime}min</span>
    ),

    // Próxima tarefa será uma pausa longa
    longBreakTime: (
      <span>Próximo: descanso por {state.config.longBreakTime}min</span>
    ),
  };

  // Renderização condicional com base em se há uma tarefa ativa ou não
  return (
    <span>
      {/* Se existir uma tarefa ativa, exibe a dica correspondente ao tipo dela */}
      {state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}

      {/* Se não existir tarefa ativa, exibe a dica com base no tipo do próximo ciclo */}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </span>
  );
};

// Exporta o componente para ser utilizado em outras partes da aplicação
export default Tips;
