import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './routes/PrivateRoute';
import 'sweetalert2/src/sweetalert2.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import { useAppSelector } from './hooks/redux-hook';
import Dashboard from './pages/Dashboard';

function App() {;
  const web = useAppSelector((state) => state.web);
  return (<>
      <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/' element={<PrivateRoute/>}  >
              <Route path='/dashboard' element={<Dashboard/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      {/* <DashboardLayout/> */}
  </>);
}

export default App;
