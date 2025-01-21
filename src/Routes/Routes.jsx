import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import RegistrationForm from "../Pages/RegistrationForm/RegistrationForm";
import LoginForm from "../Pages/LoginForm/LoginForm";
import Dashboard from "../Layout/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import AddNewTasks from '../Pages/Dashboard/AddNewTasks'
import ManageTask from '../Pages/Dashboard/ManageTask'
import ManageUsers from '../Pages/Dashboard/ManageUsers'
import MySubmissions from '../Pages/Dashboard/MySubmissions'
import MyTasks from '../Pages/Dashboard/MyTasks'
import PurchaseCoin from '../Pages/Dashboard/PurchaseCoin'
import TaskList from '../Pages/Dashboard/TaskList'
import Withdrawals from '../Pages/Dashboard/Withdrawals'
import AdminRoute from "./AdminRoute";

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
      path : '/dashboard',
      element : <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children : [
        {
          path : 'addNewTasks',
          element : <AddNewTasks></AddNewTasks>
        },
        {
          path : 'manageTask',
          element : <ManageTask></ManageTask>
        },
        {
          path : 'manageUsers',
          element : <ManageUsers></ManageUsers>
        },
        {
          path : 'mySubmissions',
          element : <MySubmissions></MySubmissions>
        },
        {
          path : 'myTasks',
          element : <MyTasks></MyTasks>
        },
        {
          path : 'purchaseCoin',
          element : <PurchaseCoin></PurchaseCoin>
        },
        {
          path : 'taskList',
          element : <TaskList></TaskList>
        },
        {
          path : 'withdrawals',
          element : <Withdrawals></Withdrawals>
        },
      ]
    }
]);