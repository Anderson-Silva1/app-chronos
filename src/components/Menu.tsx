import styles from "../styles/Menu.module.css";
import { BoltIcon, HistoryIcon, HomeIcon, SunIcon } from "lucide-react";
import Conteiner from "./Conteiner";
import { useEffect, useState } from "react";

import RouterLink from "./RouterLink";

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
        <RouterLink
          href="/"
          className={styles.icon}
          title="Página inicial"
          aria-label="Ir para a página inicial"
        >
          <HomeIcon />
        </RouterLink>

        <RouterLink
          href="/history"
          className={styles.icon}
          title="Histórico de atividades"
          aria-label="Ver histórico"
        >
          <HistoryIcon />
        </RouterLink>

        <RouterLink
          href="/config"
          className={styles.icon}
          title="Configurações"
          aria-label="Abrir configurações"
        >
          <BoltIcon />
        </RouterLink>

        {/* Tema como botão, pois é uma ação e não navegação */}
        <RouterLink
          href="#"
          onClick={handleThemeChange}
          className={styles.icon}
          title="Alterar tema"
          aria-label="Alternar entre modo claro e escuro"
          type="button"
        >
          <SunIcon />
        </RouterLink>
      </nav>
    </Conteiner>
  );
};

export default Menu;
