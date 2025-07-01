import styles from "../styles/ResponsiveTable.module.css";
import useTaskContext from "../contexts/TaskContext/useTaskContext";
import { formatDate } from "../utils/formatDate";
import { getTaskStatus } from "../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../utils/sortTasks";
import { useEffect, useState } from "react";

const ResponsiveTable = () => {
  const { state } = useTaskContext();

  const [sortedTaskOptions, setSortedTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        direction: "desc",
        field: "startDate",
      };
    }
  );

  useEffect(() => {
    setSortedTaskOptions((prevState) => {
      return {
        ...prevState,
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      };
    });
  }, [state.tasks]);

  const handleSortTasks = ({ field }: Pick<SortTasksOptions, "field">) => {
    const newDirection =
      sortedTaskOptions.direction === "desc" ? "asc" : "desc";

    setSortedTaskOptions({
      tasks: sortTasks({
        tasks: sortedTaskOptions.tasks,
        field,
        direction: newDirection,
      }),
    });
  };

  return (
    <div className={styles.responsiveTable}>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => handleSortTasks({ field: "name" })}
              className={styles.thSort}
            >
              Tarefa ↕️
            </th>
            <th
              onClick={() => handleSortTasks({ field: "duration" })}
              className={styles.thSort}
            >
              Duração ↕️
            </th>
            <th
              onClick={() => handleSortTasks({ field: "startDate" })}
              className={styles.thSort}
            >
              Data ↕️
            </th>
            <th>Status</th>
            <th>Tipo</th>
          </tr>
        </thead>

        <tbody>
          {sortedTaskOptions.tasks.map((task) => {
            const taskTypeDictionary = {
              workTime: "Foco",
              shortBreakTime: "Descanso curto",
              longBreakTime: "Descanso longo",
            };

            return (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.duration} min</td>
                <td>{formatDate(task.startDate)}</td>
                <td>{getTaskStatus(task, state.activeTask)}</td>
                <td>{taskTypeDictionary[`${task.type}`]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
