import useTaskContext from "../contexts/TaskContext/useTaskContext";
import styles from "../styles/Cycles.module.css";
import { getCurrentCycle } from "../utils/getCurrentCycle";
import { getNextCycle } from "../utils/getNextCycle";

const Cycles = () => {
  const { state } = useTaskContext();

  const cycleSteps = Array(state.currentCycle).fill(null);

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cyclesDots}>
        {cycleSteps.map((_, index) => {
          // Usamos o "_" quando não queremos usar algum parâmetro de uma função como o map

          const nextCycle = getNextCycle(index);
          const nextCycleType = getCurrentCycle(nextCycle);
          const cicledescriptionMap = {
            workTime: "Indicador de ciclo de foco",
            shortBreakTime: "Indicador de ciclo de descanso curto",
            longBreakTime: "Indicador de ciclo de descanso longo",
          };

          return (
            <span
              className={`${styles.cyclesDot} ${styles[nextCycleType]}`}
              aria-label={nextCycleType && cicledescriptionMap[nextCycleType]}
              title={nextCycleType && cicledescriptionMap[nextCycleType]}
              key={`${nextCycleType}_${nextCycle}`}
            ></span>
          );
        })}

        {/*
        <span className={`${styles.cyclesDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cyclesDot} ${styles.workTime}`}></span>
        <span className={`${styles.cyclesDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cyclesDot} ${styles.workTime}`}></span>
        <span className={`${styles.cyclesDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cyclesDot} ${styles.workTime}`}></span>
        <span className={`${styles.cyclesDot} ${styles.longBreakTime}`}></span> */}
      </div>
    </div>
  );
};

export default Cycles;
