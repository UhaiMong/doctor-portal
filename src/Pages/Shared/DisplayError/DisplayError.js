import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/Authprovider';

const DisplayError = () => {
    const {logOut } = useContext(AuthContext);
    const error = useRouteError()

    const handleToLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    };
    
    return (
        <div>
            <p className="text-red-500">Something went wrong</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>

            <span>
                You can try logout and login again
                <button onClick={handleToLogout} className='btn-primary btn btn-md'>Logout</button>
            </span>
        </div>
    );
};

export default DisplayError;