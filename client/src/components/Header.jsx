import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import useAuth from '../hooks/useAuth';
import { ToastContainer } from 'react-toastify';

const Header = () => {

    const { isAuth, logout } = useAuth();

    return (
        <>
            <header>
                <NavLink to="/">Home</NavLink>
                {isAuth ? <NavLink to="/" onClick={() => logout()}>Logout</NavLink> :
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">SingUp</NavLink>
                    </>}
            </header>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default Header;