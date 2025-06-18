import styles from "../styles/GenericHtml.module.css";

interface GenericHtmlProps {
  children: React.ReactNode;
}

const GenericHtml = ({ children }: GenericHtmlProps) => {
  return <div className={styles.genericHtml}>{children}</div>;
};

export default GenericHtml;
