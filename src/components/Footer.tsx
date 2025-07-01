import styles from "../styles/Footer.module.css";
import Conteiner from "./Conteiner";
import RouterLink from "./RouterLink";

const Footer = () => {
  return (
    <Conteiner>
      <footer className={styles.footer}>
        <RouterLink href="/about-pomodoro">
          Entenda como funciona a técnica pomodoro
        </RouterLink>
        <span>Chronos Pomodoro © 2025 - Feito com 💚</span>
      </footer>
    </Conteiner>
  );
};

export default Footer;
