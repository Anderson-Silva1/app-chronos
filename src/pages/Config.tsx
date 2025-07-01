import { useEffect } from "react";
import Conteiner from "../components/Conteiner";
import FormConfig from "../components/FormConfig";
import Heading from "../components/Heading";
import MainTemplate from "./MainTamplate";

const Config = () => {
  useEffect(() => {
    document.title = "Configirações - Chonos Pomodoro";
  }, []);
  return (
    <MainTemplate>
      <Conteiner>
        <Heading>Configurações</Heading>
      </Conteiner>
      <Conteiner>
        <FormConfig />
      </Conteiner>
    </MainTemplate>
  );
};

export default Config;
