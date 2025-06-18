import Conteiner from "../components/Conteiner";
import Footer from "../components/Footer";
import { Logo } from "../components/Logo";
import Menu from "../components/Menu";

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return (
    <Conteiner>
      <Logo />
      <Menu />

      {children}

      <Footer />
    </Conteiner>
  );
};

export default MainTemplate;
