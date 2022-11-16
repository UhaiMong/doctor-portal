import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/Authprovider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleToLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const menuItems = <React.Fragment>
        {
            user?.uid && <h1>Welcome <span className='text-xl font-semibold text-primary'>{user.displayName}</span></h1>
        }
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/appointment'>Appointment</Link>
        <Link to='/contact'>Contact</Link>
        {
            user?.uid ?
                <>
                    <Link to='/dashboard'>Dashboard</Link>
                    <Link onClick={handleToLogout}>Logout</Link>
                </>
                :
                <Link to='/login'>Login</Link>
        }

    </React.Fragment>

    return (
        <div className="navbar bg-base-100 flex justify-between sticky top-0 z-50">
            <div className="navbar-start">
                <div className='dropdown'>
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            {menuItems}
                        </li>
                    </ul>
                </div>

                <div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        {menuItems}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;