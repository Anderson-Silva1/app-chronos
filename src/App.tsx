import "./styles/globals/Theme.css";
import "./styles/globals/App.css";

import Home from "./pages/Home";
import TaskContextProvider from "./components/TaskContextProvider";

function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}

export default App;
