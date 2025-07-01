import type { ButtonHTMLAttributes } from "react";
import styles from "../styles/ButtonTable.module.css";
import useTaskContext from "../contexts/TaskContext/useTaskContext";
import { TaskActionTypes } from "../contexts/TaskContext/taskActions";

interface ButtonTableProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const ButtonTable = (props: ButtonTableProps) => {
  const { dispatch } = useTaskContext();

  const handleResetHistory = () => {
    if (!confirm()) return;

    dispatch({ type: TaskActionTypes.RESET_STATE });
  };

  return (
    <button
      onClick={handleResetHistory}
      {...props}
      className={styles.buttonTable}
      title="Apagar histórico"
      aria-label="Apagar Histórico"
    >
      {props.icon}
    </button>
  );
};

export default ButtonTable;
