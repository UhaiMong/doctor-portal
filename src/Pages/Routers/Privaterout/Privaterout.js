import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Context/Authprovider';

const Privaterout = ({ children }) => {
    const { user,loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className=' w-56 mx-auto mt-14'><progress className="progress"></progress></div>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default Privaterout;