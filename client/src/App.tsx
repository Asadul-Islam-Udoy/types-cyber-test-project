import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/users/auth/RegisterPage";
import LoginPage from "./pages/users/auth/LoginPage";
import Contract from "./pages/users/contract/Contract";
import LogoutPage from "./pages/users/auth/LogoutPage";
import UserContractList from "./pages/admin/dashboard/userList/UserContractList";
import { useAuth } from "./context/UserContext";
import AdminMiddleware from "./middleware/AdminMiddleware";


function App() {
  const [auth] = useAuth();
  
  const admiMiddle  = auth?.user?.role =='admin';
  
  return (
    <div>
      <ToastContainer aria-label="notification" />
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/" element={<Contract />} />
            <Route path="/dashboard/users/contract" element={
              <AdminMiddleware isAdmin={admiMiddle}>
                <UserContractList/>
            </AdminMiddleware>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
