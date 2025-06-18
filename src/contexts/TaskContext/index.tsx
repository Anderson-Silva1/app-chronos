// Importa a função createContext do React, usada para criar o contexto global
import { createContext } from "react";

// Importa apenas o tipo do modelo de estado da tarefa (estado global da aplicação de tarefas)
import type { TaskStateModel } from "../../models/TaskStateModel";

// Importa o estado inicial definido para o contexto de tarefas
import { initialTaskState } from "./initialTaskState";

// Importa apenas o tipo das ações que podem ser disparadas no reducer
import type { TaskActionModel } from "./taskActions";

// Valor inicial fornecido ao contexto antes de qualquer Provider ser renderizado
const initialContextValue = {
  // Define o estado inicial do contexto como o estado de tarefas padrão
  state: initialTaskState,

  // Define a função dispatch como uma função vazia (placeholder)
  // Isso evita erro de "undefined" antes do contexto ser efetivamente preenchido
  dispatch: () => {},
};

// Define o tipo das propriedades que o contexto irá compartilhar
type TaskContextProps = {
  state: TaskStateModel; // Estado atual das tarefas (configurações, tarefa ativa etc.)
  dispatch: React.Dispatch<TaskActionModel>; // Função que despacha ações para o reducer
};

// Cria o contexto de tarefas com o tipo `TaskContextProps`
// O valor inicial `initialContextValue` serve como fallback e segurança de tipagem
export const TaskContext = createContext<TaskContextProps>(initialContextValue);
