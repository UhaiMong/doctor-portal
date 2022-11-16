import { createBrowserRouter, Link } from "react-router-dom";
import Main from "../../../Layout/Main";
import Appointment from "../../Appointment/Appointment/Appointment";
import Dashboard from "../../Dashboard/Dashboard/Dashboard";
import Home from "../../Home/Home";
import Login from "../../Login/Login";
import Signup from "../../Signup/Signup";
import Privaterout from "../Privaterout/Privaterout";
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
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/dashboard',
                element: <Privaterout><Dashboard></Dashboard></Privaterout>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            },
        ]
    },
    {
        path: '*',
        element:<div className="text-center mt-48"><h1 className="text-9xl text-accent font-extrabold">404</h1><br/><p className="text-3xl font-bold text-gray-700">The page not found!!</p><br/><Link to='/' className="text-blue-700 text-2xl hover:underline">Go to Home</Link></div>
    }
    
])