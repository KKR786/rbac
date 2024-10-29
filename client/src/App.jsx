import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashoard from "./pages/Dashoard";
import Topbar from "./components/navbar/Topbar";
import Sidebar from "./components/navbar/Sidebar";

function App() {

  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Sidebar />
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Register />}
          />
          <Route
            path="/"
            element={<Dashoard />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
