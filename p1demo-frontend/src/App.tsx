import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Components/Login-Register/Login";
import { Register } from "./Components/Login-Register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Teams } from "./Components/Teams/Teams";
import { Users } from "./Components/Users/Users";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
