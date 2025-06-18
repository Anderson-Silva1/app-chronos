import styles from "../styles/Menu.module.css";
import { BoltIcon, HistoryIcon, HomeIcon, SunIcon } from "lucide-react";
import Conteiner from "./Conteiner";
import { useEffect, useState } from "react";

const Menu = () => {
  type AvailableTheme = "dark" | "light";

  const [theme, setTheme] = useState<AvailableTheme>(() => {
    const newTheme = localStorage.getItem("theme");
    return newTheme as AvailableTheme;
  });

  const handleThemeChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Conteiner>
      <nav className={styles.menu}>
        <a href="#" className={styles.icon}>
          <HomeIcon />
        </a>
        <a href="#" className={styles.icon}>
          <HistoryIcon />
        </a>
        <a href="#" className={styles.icon}>
          <BoltIcon />
        </a>
        <a href="#" className={styles.icon} onClick={handleThemeChange}>
          <SunIcon />
        </a>
      </nav>
    </Conteiner>
  );
};

export default Menu;
