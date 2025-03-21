import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import RegisterPage from './pages/users/auth/RegisterPage';
import LoginPage from './pages/users/auth/LoginPage';
import Contract from './pages/users/contract/Contract';
import LogoutPage from './pages/users/auth/LogoutPage';
import UserList from './pages/admin/dashboard/userList/UserContractList';
function App() {
  return (
    <div>
      <BrowserRouter>
       <div>
        <Routes>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/logout' element={<LogoutPage/>}/>
          <Route path='/contract' element={<Contract/>}/>
          <Route path='/dashboard/users/contract' element={<UserList/>}/>
        </Routes>
       </div>
       </BrowserRouter>
    </div>
  );
}

export default App;
