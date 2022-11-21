import { createBrowserRouter, Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Main from "../../../Layout/Main";
import Appointment from "../../Appointment/Appointment/Appointment";
import AddDoctor from "../../Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Dashboard/Dashboard/Dashboard";
import ManageDoctor from "../../Dashboard/ManageDoctor/ManageDoctor";
import MyAppointment from "../../Dashboard/MyAppointment/MyAppointment";
import Home from "../../Home/Home";
import Login from "../../Login/Login";
import Signup from "../../Signup/Signup";
import Adminrout from "../Adminrout/Adminrout";
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
                path: '/appointment',
                element: <Appointment></Appointment>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Privaterout><DashboardLayout></DashboardLayout></Privaterout>,
        children: [
            {
                path: '/dashboard',
                element:<MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <Adminrout><AllUsers></AllUsers></Adminrout>
            },
            {
                path: '/dashboard/adddoctor',
                element: <Adminrout><AddDoctor/></Adminrout>
            },
            {
                path: '/dashboard/mangedoctors',
                element: <Adminrout><ManageDoctor/></Adminrout>
            },
        ]
    },
    // 404 page rout
    {
        path: '*',
        element:<div className="text-center mt-48"><h1 className="text-9xl text-accent font-extrabold">404</h1><br/><p className="text-3xl font-bold text-gray-700">The page not found!!</p><br/><Link to='/' className="text-blue-700 text-2xl hover:underline">Go to Home</Link></div>
    }
    
])