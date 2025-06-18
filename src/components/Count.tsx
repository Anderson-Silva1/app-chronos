import useTaskContext from "../contexts/TaskContext/useTaskContext";
import styles from "../styles/Count.module.css";
import Conteiner from "./Conteiner";

const Count = () => {
  const { state } = useTaskContext();

  return (
    <Conteiner>
      <section className={styles.conteiner}>
        <span>{state.formattedSecondsRemaining}</span>
      </section>
    </Conteiner>
  );
};

export default Count;
