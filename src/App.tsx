import { Navbar } from "./components/Navbar";
import { useState } from "react";
import TodoWrapper from "./components/TodoWrapper";

function App() {
  const [activeTab, setActiveTab] = useState("TodoList");

  return (
    <div className="App">
      <Navbar
        activeTab={activeTab}
        activeTabFun={(value) => setActiveTab(value)}
      />
      {activeTab === "TodoList" && (
        <TodoWrapper/>
      )}
    </div>
  );
}

export default App;
