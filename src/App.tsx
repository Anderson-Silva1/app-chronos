import "./styles/globals/Theme.css";
import "./styles/globals/App.css";

import TaskContextProvider from "./components/TaskContextProvider";
import MessegesContainer from "./components/MessegesContainer";
import MainRouter from "./routers/MainRouter";

function App() {
  return (
    <TaskContextProvider>
      <MessegesContainer>
        <MainRouter />
      </MessegesContainer>
    </TaskContextProvider>
  );
}

export default App;
