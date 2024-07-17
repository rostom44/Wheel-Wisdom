import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import "./styles/App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
