import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const GuestGuard = ({ children }) => {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to="/login" />
    }

    return (
        <>
            { children }
        </>
    );
}

export default GuestGuard;