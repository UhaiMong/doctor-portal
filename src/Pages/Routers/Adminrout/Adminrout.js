import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Context/Authprovider';
import useAdmin from '../../../hooks/useAdmin';

const Adminrout = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const location = useLocation();
    
    if (loading || isAdminLoading) {
        return <div className=' w-56 mx-auto mt-14'><progress className="progress"></progress></div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default Adminrout;