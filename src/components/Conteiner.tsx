import styles from "../styles/Conteiner.module.css";

interface ConteinerProps {
  children?: React.ReactNode;
}

const Conteiner = ({ children }: ConteinerProps) => {
  return (
    <div className={styles.conteiner}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Conteiner;
