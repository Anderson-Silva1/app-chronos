import styles from "../styles/Footer.module.css";
import Conteiner from "./Conteiner";

const Footer = () => {
  return (
    <Conteiner>
      <footer className={styles.footer}>
        <a href="#">Entenda como funciona a técnica pomodoro</a>
        <span>Chronos Pomodoro © 2025 - Feito com 💚</span>
      </footer>
    </Conteiner>
  );
};

export default Footer;
