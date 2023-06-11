import { createBrowserRouter, Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";
import Main from "../../../Layout/Main";
import Appointment from "../../Appointment/Appointment/Appointment";
import AddDoctor from "../../Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Dashboard/AllUsers/AllUsers";
import Payment from "../../Dashboard/Dashboard/Payment/Payment";
import ManageDoctor from "../../Dashboard/ManageDoctor/ManageDoctor";
import MyAppointment from "../../Dashboard/MyAppointment/MyAppointment";
import Home from "../../Home/Home";
import Login from "../../Login/Login";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import Signup from "../../Signup/Signup";
import Adminrout from "../Adminrout/Adminrout";
import Privaterout from "../Privaterout/Privaterout";

export const routers = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError/>,
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
        errorElement: <DisplayError/>,
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
            {
                path: '/dashboard/payment/:id',
                element: <Adminrout><Payment /></Adminrout>,
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`)
            },
        ]
    },
    // 404 page rout
    {
        path: '*',
        element:<div className="text-center mt-48"><h1 className="text-9xl text-accent font-extrabold">404</h1><br/><p className="text-3xl font-bold text-gray-700">The page not found!!</p><br/><Link to='/' className="text-blue-700 text-2xl hover:underline">Go to Home</Link></div>
    }
    
])