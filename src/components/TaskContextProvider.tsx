// Importa os hooks do React necessários para gerenciamento de efeito colateral e estado complexo
import { useEffect, useReducer, useRef } from "react";

// Importa o estado inicial do contexto de tarefas
import { initialTaskState } from "../contexts/TaskContext/initialTaskState";

// Importa o contexto que será utilizado para compartilhar o estado global de tarefas
import { TaskContext } from "../contexts/TaskContext";

// Importa a função reducer responsável por atualizar o estado com base nas ações disparadas
import { taskReducer } from "../contexts/TaskContext/taskReducer";
import { TimerWorkerManager } from "../workers/timerWorckerManager";
import { TaskActionTypes } from "../contexts/TaskContext/taskActions";
import { loadBeep } from "../utils/loadBeep";

// Define a interface que tipa a prop `children` recebida pelo componente (padrão em Providers)
interface TaskContextProviderProps {
  children: React.ReactNode; // Espera qualquer tipo de elemento React como filho
}

// Componente funcional que provê o contexto de tarefas para os componentes filhos
const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
  // Hook useReducer substitui o useState para estados mais complexos e com múltiplas ações
  // `state` é o estado atual, `dispatch` é a função que dispara ações para o reducer
  // `taskReducer` é a função que trata as ações e `initialTaskState` é o valor inicial do estado
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem("state");

    if (storageState === null) return initialTaskState;

    console.log(JSON.parse(storageState));

    const parsedStorageState = JSON.parse(storageState);

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: "00:00",
    };
  });

  const playAudioRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e) => {
    // console.log(e.data);
    const secondsRemmain = Number(e.data);
    if (secondsRemmain <= 0) {
      if (playAudioRef.current) {
        // console.log("Tocando audio");
        playAudioRef.current();
        playAudioRef.current = null;
      }

      dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: e.data },
      });
    }
  });

  // useEffect é um hook que executa efeitos colaterais
  // Neste caso, sempre que o `state` for alterado, o console.log será executado
  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }

    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    worker.postMessage(state);

    // console.log(state); // Útil para debugging e monitoramento do estado em tempo real
  }, [state, worker]); // Dependência do hook: será executado sempre que `state` mudar

  useEffect(() => {
    if (state.activeTask && playAudioRef.current === null) {
      // console.log("Carregando audio...");
      playAudioRef.current = loadBeep();
    } else {
      // console.log("Zerando audio...");
      playAudioRef.current = null;
    }
  }, [state.activeTask]);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    // Retorna o Provider do contexto, que compartilha `state` e `dispatch` com toda a árvore de componentes abaixo
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
      {/* Renderiza os componentes filhos que estarão envolvidos nesse contexto */}
    </TaskContext.Provider>
  );
};

// Exporta o componente como default para ser usado em qualquer parte da aplicação
export default TaskContextProvider;
