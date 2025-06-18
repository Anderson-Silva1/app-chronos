// Importa o tipo do modelo de estado do contexto de tarefas
// Aqui estamos buscando aproveitar a tipagem da propriedade `config`
import type { TaskStateModel } from "./TaskStateModel";

// Define a interface (modelo) de uma tarefa que será usada no estado global, reducer e componentes
export interface TaskModel {
  // Identificador único da tarefa (ex: UUID ou timestamp convertido)
  id: string;

  // Nome da tarefa, que será exibido para o usuário
  name: string;

  // Duração da tarefa em minutos (ex: 25, 5, 15)
  duration: number;

  // Timestamp (em milissegundos) que indica quando a tarefa começou
  startDate: number;

  // Timestamp (em milissegundos) que indica quando a tarefa foi concluída
  // Se for null, significa que ainda não foi concluída
  completeDate: number | null;

  // Timestamp (em milissegundos) que indica quando a tarefa foi interrompida
  // Se for null, significa que não foi interrompida
  interruptDate: number | null;

  // Tipo da tarefa: pode ser "workTime", "shortBreakTime" ou "longBreakTime"
  // Aqui usamos keyof para garantir que seja uma das chaves da config no estado
  type: keyof TaskStateModel["config"];
}
