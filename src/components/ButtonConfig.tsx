import styles from "../styles/ButtonConfig.module.css";
import type { ButtonHTMLAttributes } from "react";

interface ButtonConfigProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const ButtonConfig = ({ icon, ...props }: ButtonConfigProps) => {
  return (
    <button className={styles.button} {...props}>
      {icon}
    </button>
  );
};

export default ButtonConfig;
