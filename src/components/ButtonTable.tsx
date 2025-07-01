import type { ButtonHTMLAttributes } from "react";
import styles from "../styles/ButtonTable.module.css";
import useTaskContext from "../contexts/TaskContext/useTaskContext";
import { TASK_ACTION_TYPES } from "../contexts/TaskContext/taskActions";
import { showMessage } from "../adapters/showMessage";

interface ButtonTableProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const ButtonTable = (props: ButtonTableProps) => {
  const { dispatch } = useTaskContext();

  const handleResetHistory = () => {
    if (!confirm()) return;

    dispatch({ type: TASK_ACTION_TYPES.RESET_STATE });
    showMessage.dismiss();
    showMessage.success("Histórico apagado com sucesso!!");
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
