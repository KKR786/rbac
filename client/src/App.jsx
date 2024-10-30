import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./hooks/useAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashoard from "./pages/Dashoard";
import RoleManagement from "./pages/RoleManagement";
import Topbar from "./components/navbar/Topbar";
import Sidebar from "./components/navbar/Sidebar";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Sidebar />
        <div className="sm:ml-64 mt-14">
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path="/signup" element={<Register />} />
              
              <Route path="/" element={user ? <Dashoard /> : <Navigate to='/login' />} />
              <Route path="/role-management" element={user ? <RoleManagement /> : <Navigate to='/login' />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
