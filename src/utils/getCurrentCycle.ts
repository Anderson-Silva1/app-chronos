// Importa o tipo TaskModel do arquivo ../models/TaskModel para garantir tipagem correta no TypeScript
import type { TaskModel } from "../models/TaskModel";

// Função que recebe um número representando o ciclo atual e retorna uma string que indica o tipo do ciclo
// O tipo de retorno é o campo "type" definido dentro do TaskModel
export const getCurrentCycle = (currentCycle: number): TaskModel["type"] => {
  // Se o ciclo atual for múltiplo de 8 (ex: 8, 16, 24), retorna "longBreakTime"
  // Geralmente usado para definir pausas mais longas após vários ciclos de trabalho
  if (currentCycle % 8 === 0) return "longBreakTime";

  // Se o ciclo atual for múltiplo de 2 (ex: 2, 4, 6), mas não múltiplo de 8, retorna "shortBreakTime"
  // Representa pausas curtas entre ciclos de trabalho
  if (currentCycle % 2 === 0) return "shortBreakTime";

  // Para todos os outros casos (ciclos ímpares), retorna "workTime"
  // Representa os períodos dedicados ao trabalho focado
  return "workTime";
};
