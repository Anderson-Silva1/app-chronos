// Importa os estilos CSS do formulário
import styles from "../styles/Form.module.css";

// Importa o componente de layout/container da aplicação
import Conteiner from "./Conteiner";

// Importa o componente de input reutilizável
import Input from "./Input";

// Importa componente visual dos ciclos (quantos foram feitos)
import Cycles from "./Cycles";

// Importa botão customizado
import Button from "./Button";

// Hook para criar referência de DOM (para o input)
import { useRef } from "react";

// Modelo da Task, que será usado para tipar a nova task
import type { TaskModel } from "../models/TaskModel";

// Hook customizado que retorna o contexto das tarefas
import useTaskContext from "../contexts/TaskContext/useTaskContext";

// Função utilitária para calcular o próximo ciclo (ex: de 3 pra 4)
import { getNextCycle } from "../utils/getNextCycle";

// Função que define o tipo do próximo ciclo (workTime, breakTime e longBreakTime.)
import { getCurrentCycle } from "../utils/getCurrentCycle";

// Ícones que serão usados nos botões
import { CircleStopIcon, PlayIcon } from "lucide-react";

// Enum com os tipos de ações possíveis no reducer
import { TASK_ACTION_TYPES } from "../contexts/TaskContext/taskActions";

// Componente que mostra dicas com base no ciclo atual/seguinte
import Tips from "./Tips";

import { showMessage } from "../adapters/showMessage";

const Form = () => {
  // Hook personalizado que retorna o estado global e o dispatcher de ações
  const { state, dispatch } = useTaskContext();

  // Calcula o número do próximo ciclo
  const nextCycle = getNextCycle(state.currentCycle);

  // Determina o tipo do próximo ciclo (ex: "workTime")
  const nextCycleType = getCurrentCycle(nextCycle);

  // Cria uma referência para o input de nome da task
  const taskNameRef = useRef<HTMLInputElement>(null);

  const stateTasksLength = state.tasks?.length || 0;
  const lastTaskName = state.tasks?.[stateTasksLength - 1]?.name || "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    showMessage.dismiss();
    // Previne o comportamento padrão do form (recarregar a página)
    event.preventDefault();

    // Verifica se o ref existe
    if (taskNameRef.current === null) return;

    // Pega o valor do input e remove espaços extras
    const taskName = taskNameRef.current.value.trim();

    // Verifica se o campo está vazio e alerta o usuário
    if (!taskName) {
      showMessage.warn("Digite algo no campo de texto");
      return;
    }

    // Cria um objeto do tipo TaskModel com as informações preenchidas
    const newTask: TaskModel = {
      id: Date.now().toString(), // ID único baseado no timestamp atual
      name: taskName, // Nome digitado pelo usuário
      completeDate: null, // Ainda não completada
      interruptDate: null, // Ainda não interrompida
      duration: state.config[nextCycleType], // Duração com base no tipo de ciclo
      startDate: Date.now(), // Data de início no momento do submit
      type: nextCycleType, // Tipo de ciclo (ex: workTime, breakTime)
    };

    // Dispara a ação START_TASK para o reducer, ativando o ciclo e armazenando a task
    dispatch({ type: TASK_ACTION_TYPES.START_TASK, payload: newTask });

    showMessage.success("Tarefa iniciada");
  };

  const handleInterruptedTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Previne comportamento padrão
    e.preventDefault();

    // Dispara a ação de interrupção da tarefa atual
    dispatch({ type: TASK_ACTION_TYPES.INTERRUPT_TASK });
    showMessage.dismiss();
    showMessage.error("Terefa interrompida");
  };

  return (
    <Conteiner>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Campo de input */}
        <div className={styles.formGroup}>
          <label htmlFor="taskName">task</label>
          <Input
            type="text"
            id="taskName"
            placeholder="Digite Algo"
            ref={taskNameRef}
            disabled={!!state.activeTask} // Desativa se já tiver uma task ativa
            defaultValue={lastTaskName}
          />
        </div>

        {/* Dica sobre o próximo ciclo */}
        <div className={styles.formGroup}>
          <Tips nextCycleType={nextCycleType} state={state} />
        </div>

        {/* Mostra os ciclos se já houve pelo menos um */}
        <div className={styles.formGroup}>
          {state.currentCycle > 0 && <Cycles />}
        </div>

        {/* Botões de ação: iniciar ou interromper */}
        <div className={styles.formGroup}>
          {!state.activeTask && (
            <Button
              cor="green"
              icon={<PlayIcon />}
              type="submit"
              aria-label="Iniciar task"
              title="Iniciar task"
              key="Iniciar task"
            />
          )}
          {state.activeTask && (
            <Button
              cor="red"
              icon={<CircleStopIcon />}
              type="button"
              aria-label="Finalizar task"
              title="Finalizar task"
              key="Finalizar task"
              onClick={handleInterruptedTask}
            />
          )}
        </div>
      </form>
    </Conteiner>
  );
};

export default Form;
