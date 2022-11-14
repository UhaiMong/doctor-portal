import { createBrowserRouter } from "react-router-dom";
import Main from "../../../Layout/Main";
import Appointment from "../../Appointment/Appointment/Appointment";
import Home from "../../Home/Home";
import Login from "../../Login/Login";
export const routers = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element:<Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]
    },
    
])