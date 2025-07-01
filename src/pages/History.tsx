import { TrashIcon } from "lucide-react";
import Heading from "../components/Heading";
import MainTemplate from "./MainTamplate";
import ResponsiveTable from "../components/ResponsiveTable";
import ButtonTable from "../components/ButtonTable";
import useTaskContext from "../contexts/TaskContext/useTaskContext";
import { useEffect } from "react";

const History = () => {
  useEffect(() => {
    document.title = "Histórico - Chonos Pomodoro";
  }, []);

  const { state } = useTaskContext();

  const hasTask = state.tasks.length > 0;

  return (
    <MainTemplate>
      <Heading>
        <span>Histórico</span>
        <ButtonTable icon={<TrashIcon />} />
      </Heading>

      {hasTask && <ResponsiveTable />}
      {!hasTask && (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Não existe tarefas criadas
        </p>
      )}
    </MainTemplate>
  );
};

export default History;
