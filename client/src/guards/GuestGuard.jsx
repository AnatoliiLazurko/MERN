import React, { useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { LoadingContext } from '../contexts/LoadingContext';

const GuestGuard = ({ children }) => {
    const { isAuth } = useAuth();
    const { status } = useContext(LoadingContext);

    if (status !== "loaded") return "Loading...";

    if (!isAuth && status === 'loaded') {
        return <Navigate to="/login" />
    }

    return (
        <>
            { children }
        </>
    );
}

export default GuestGuard;