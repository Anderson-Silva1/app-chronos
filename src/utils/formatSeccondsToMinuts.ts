// Função que recebe um número em segundos e converte para o formato "MM:SS"
export const formatSeccondsToMinuts = (seconds: number) => {
  // Calcula a quantidade inteira de minutos dividindo os segundos por 60
  // Math.floor para arredondar para baixo (exemplo: 125s vira 2 minutos)
  // Depois converte para string e usa padStart para garantir que tenha 2 dígitos, adicionando '0' à esquerda se necessário
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");

  // Calcula o restante dos segundos após extrair os minutos
  // Usa operador módulo (%) para obter o resto da divisão por 60
  // Também arredonda para baixo e converte para string com 2 dígitos (exemplo: 125 % 60 = 5s vira "05")
  const secondsMod = String(Math.floor(seconds % 60)).padStart(2, "0");

  // Retorna a string formatada no padrão "MM:SS", com espaço extra no final (pode ser removido se não for necessário)
  return `${minutes}:${secondsMod} `;
};
