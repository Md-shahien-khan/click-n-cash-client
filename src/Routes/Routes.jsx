import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import RegistrationForm from "../Pages/RegistrationForm/RegistrationForm";
import LoginForm from "../Pages/LoginForm/LoginForm";
import Dashboard from "../Layout/Dashboard";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children : [
        {
            path : '/',
            element : <Home></Home>
        },
        {
          path : 'register',
          element : <RegistrationForm></RegistrationForm>
        },
        {
          path : 'login',
          element : <LoginForm></LoginForm>
        }
      ]
    },
    {
      path : 'dashboard',
      element : <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children : [
        {
          path : 'cart'
        }
      ]
    }
]);