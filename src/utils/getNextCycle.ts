// Função que recebe o número do ciclo atual e retorna o próximo ciclo da sequência
export const getNextCycle = (currentCycle: number) => {
  // Se o ciclo atual for 0 (início) ou 8 (fim de uma rodada completa), reinicia para o ciclo 1
  // Caso contrário, simplesmente incrementa o ciclo atual em 1 para avançar para o próximo
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
};
