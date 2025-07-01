import { useEffect } from "react";
import Count from "../components/Count";
import Form from "../components/Form";

import MainTemplate from "./MainTamplate";

const Home = () => {
  useEffect(() => {
    document.title = "Chonos Pomodoro";
  }, []);

  return (
    <MainTemplate>
      <Count />
      <Form />
    </MainTemplate>
  );
};

export default Home;
