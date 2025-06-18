import styles from "../styles/Logo.module.css";
import { TimerIcon } from "lucide-react";
import Conteiner from "./Conteiner";

export const Logo = () => {
  return (
    <Conteiner>
      <div className={styles.conteiner}>
        <TimerIcon />
        <h1 className={styles.title}>Chronos</h1>
      </div>
    </Conteiner>
  );
};
