import styles from "../styles/Button.module.css";
import type { ButtonHTMLAttributes } from "react";
import type React from "react";

type ButtonProps = {
  cor: string;
  icon: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  return (
    <button {...props} className={`${styles.button} ${styles[props.cor]}`}>
      {props.icon}
    </button>
  );
};

export default Button;
