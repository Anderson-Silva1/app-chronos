// Importa o hook useContext do React, que permite consumir dados de um contexto
import { useContext } from "react";

// Importa o contexto de tarefas que foi previamente criado e exportado no index do diretório
import { TaskContext } from ".";

// Cria um hook customizado para encapsular o acesso ao contexto de tarefas
// Isso melhora a legibilidade e a reutilização em toda a aplicação
const useTaskContext = () => {
  // Usa o useContext para acessar o valor atual do TaskContext (state + dispatch)
  return useContext(TaskContext);
};

// Exporta o hook customizado para ser usado em componentes funcionais
export default useTaskContext;
