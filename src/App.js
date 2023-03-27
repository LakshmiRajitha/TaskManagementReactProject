import React, { useState, useEffect } from "react";
import "./App.css";

import TaskDashboard from "./components/TaskDashboard";
import { GetTasks } from "../src/services/Task";

function App() {
  const [items, setitems] = useState([]);
  const [renderUI, setrenderUI] = useState(false);
  useEffect(() => {
    getTasks();
  }, []);

  let getTasks = async () => {
    let res = await GetTasks();
    setitems(res);
    setrenderUI(true);
  };

  return (
    <>
      {renderUI && (
        <div className="App">
          <TaskDashboard items={items}> </TaskDashboard>
        </div>
      )}
    </>
  );
}

export default App;
