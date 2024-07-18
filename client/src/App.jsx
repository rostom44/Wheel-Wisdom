import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import Navbar from "./components/navbar/navbar";
import "./styles/App.css";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
    </UserProvider>
  );
}

export default App;
