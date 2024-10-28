import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Register />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App