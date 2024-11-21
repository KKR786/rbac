import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAuthContext } from "./hooks/useAuth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashoard from "./pages/Dashoard";
import RoleManagement from "./pages/RoleManagement";
import UserManagement from "./pages/UserManagement";
import Nav from "./components/navbar/Nav";
import TaskManagement from "./pages/TaskManagement";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import SiteConfig from "./pages/site/SiteConfig";
import Sites from "./pages/site/Sites";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        {user && <Nav />}
        <div className={`${user ? 'sm:ml-64 mt-14' : ''}`}>
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path="/signup" element={!user ? <Register /> : <Navigate to='/' />} />

              <Route path="/" element={user ? <Dashoard /> : <Navigate to='/login' />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to='/login' />} />
              <Route path="/products" element={user ? <Products /> : <Navigate to='/login' />} />
              <Route path="/role-management" element={user ? <RoleManagement /> : <Navigate to='/login' />} />
              <Route path="/user-management" element={user ? <UserManagement /> : <Navigate to='/login' />} />
              <Route path="/task-management" element={user ? <TaskManagement /> : <Navigate to='/login' />} />
              <Route path="/site-config" element={user ? <Sites /> : <Navigate to='/login' />} />
              <Route path="/site-config/:id" element={user ? <SiteConfig /> : <Navigate to='/login' />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
