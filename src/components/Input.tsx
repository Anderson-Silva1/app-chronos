import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "../styles/Input.module.css";

// Tipagem das props, sem o `ref` aqui
type InputProps = InputHTMLAttributes<HTMLInputElement>;

// forwardRef permite passar a ref para o <input>
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input className={styles.input} {...props} ref={ref} />;
});

export default Input;
