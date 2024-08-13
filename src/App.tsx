import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthLayout from './Components/AuthLayout/AuthLayout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import MasterLayout from './Components/MasterLayout/MasterLayout';
import Notfound from './Components/Notfound/Notfound';
import Profile from './Components/Profile/Profile';
import UserData from './Components/UserData/UserData';
import UsersList from './Components/UsersList/UsersList';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
      ],
    },
    {
      path: 'dashboard',
      element: <MasterLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <UsersList /> },
        { path: 'home', element: <Home /> },
        { path: 'userslist', element: <UsersList /> },
        { path: 'userdata', element: <UserData /> },
        { path: 'userdata/:userId', element: <UserData /> },
        { path: 'profile', element: <Profile /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
