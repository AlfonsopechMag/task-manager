import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./Components";
import Home from "./pages/HomePage"
import Graph from "./pages/Graph";
import "./App.scss";

function App() {
  return (
    <div id="main">
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/graph" element={<Graph/>} />
        </Routes>
      </Sidebar>
    </div>
  );
}

export default App;
