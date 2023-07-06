import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const initialState = {
    isAuth: false,
    user: null
};

const authReducer = (state, {type, payload}) => {
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                isAuth: true,
                user: payload.user
            }
        
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
                user: null
            }
    
        default:
            return state;
    }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async ({ email, password }) => {
        try {
            const res = await axios.post('http://localhost:4000/api/login', { email, password });
            localStorage.setItem('token', res.data.token);
            await getUser();
        }
        catch (error) { 
            toast(error.response.data.message);
            console.log(error);
        }
    }

    const register = async ({ email, password, username }) => {
        try {
            const res = await axios.post('http://localhost:4000/api/signup', { email, password, username });
            localStorage.setItem('token', res.data.token);
            await getUser();
        }   
        catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem('token');
            dispatch({
                type: 'LOGOUT'
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    const getUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                axios.defaults.headers.common['x-auth-token'] = token;
                const res = await axios.get('http://localhost:4000/api/user-info');

                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user: res.data.user
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            delete axios.defaults.headers.common['x-auth-token'];
        }
    }

    const getUserInfo = async () => {
        if (!state.user) {
            await getUser();
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [state]);

    return <AuthContext.Provider value={{...state, login, register, logout}}>
        { children }
    </AuthContext.Provider>;
}

export default AuthContext;