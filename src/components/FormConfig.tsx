import { SaveIcon } from "lucide-react";
import styles from "../styles/Form.module.css";
import ButtonConfig from "./ButtonConfig";
import Input from "./Input";
import { useState } from "react";
import useTaskContext from "../contexts/TaskContext/useTaskContext";
import { TASK_ACTION_TYPES } from "../contexts/TaskContext/taskActions";
import { showMessage } from "../adapters/showMessage";

type configType = {
  workTime: number;
  shortBreakTime: number;
  longBreakTime: number;
};

const FormConfig = () => {
  const { state, dispatch } = useTaskContext();

  const [config, setConfig] = useState<configType>(() => {
    return {
      workTime: state.config["workTime"],
      longBreakTime: state.config["longBreakTime"],
      shortBreakTime: state.config["shortBreakTime"],
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    showMessage.dismiss();

    const formError = [];

    if (config.workTime < 1 || config.workTime > 120) {
      formError.push("Digite um tempo para foco de 1 a 120 minutos");
    }

    if (config.shortBreakTime < 1 || config.shortBreakTime > 30) {
      formError.push("Digite um tempo para descanso curto de 1 a 30 minutos");
    }

    if (config.longBreakTime < 1 || config.longBreakTime > 60) {
      formError.push("Digite um tempo para descanso longo de 1 a 60 minutos");
    }

    if (formError.length > 0) {
      formError.forEach((error) => {
        showMessage.error(error);
      });
      return;
    }

    if (!confirm("Tem certeza que quer mudar a configuração de tempo?")) return;

    dispatch({
      type: TASK_ACTION_TYPES.CHANGE_SETTINGS,
      payload: config,
    });

    showMessage.success("Configuração de tempo alterada com sucesso!");
  };

  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="worktime">Foco</label>
        <Input
          id="worktime"
          aria-label="Mudar valor do tempo do foco"
          title="Mudar valor do tempo do foco"
          type="number"
          value={config.workTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);
            setConfig((prevState) => {
              return {
                ...prevState,
                workTime: Number(e.target.value),
              };
            });
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="shortBreakTime">Descanso curto</label>
        <Input
          id="shortBreakTime"
          aria-label="Mudar valor do tempo do descanso curto"
          title="Mudar valor do tempo do descanso curto"
          type="number"
          value={config.shortBreakTime}
          onChange={(e) => {
            setConfig((prevState) => {
              return {
                ...prevState,
                shortBreakTime: Number(e.target.value),
              };
            });
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="longBreakTime">Descanso longo</label>
        <Input
          id="longBreakTime"
          aria-label="Mudar valor do tempo do descanso longo"
          title="Mudar valor do tempo do descanso longo"
          type="number"
          value={config.longBreakTime}
          onChange={(e) => {
            setConfig((prevState) => {
              return {
                ...prevState,
                longBreakTime: Number(e.target.value),
              };
            });
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <ButtonConfig
          icon={<SaveIcon />}
          onClick={handleSubmit}
          type="button"
        />
      </div>
    </form>
  );
};

export default FormConfig;
