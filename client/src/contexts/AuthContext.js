import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const initialState = {
    isAuth: false,
    user: null,
};

const initiaLoading = {
    status: null
};

const loadingReducer = (state, { type, payload }) => {
    switch (type) {
        case 'LOADING':
            return {
                ...state,
                status: 'loading'
            }
        case 'LOADED':
            return {
                ...state,
                status: 'loaded'
            }
    
        default:
            return state
    }
}

const authReducer = (state, {type, payload}) => {
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                isAuth: true,
                user: payload.user,
                status: true
            }
        
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
                user: null,
                status: null
            }
    
        default:
            return state;
    }
}

const AuthContext = createContext();
const LoadingContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [stateLoading, dispatchLoading] = useReducer(loadingReducer, initiaLoading);

    const login = async ({ email, password }) => {
        dispatchLoading({ type: 'LOADING' })
        try {
            const res = await axios.post('http://localhost:4000/api/login', { email, password });
            localStorage.setItem('token', res.data.token);
            await getUser();
        }
        catch (error) { 
            toast(error.response.data.message);
            console.log(error);
        }
        dispatchLoading({ type: 'LOADED' })
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
        dispatchLoading({ type: 'LOADING' })
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
        dispatchLoading({ type: 'LOADED' })
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
        <LoadingContext.Provider value={{...stateLoading}}>
            {children}
        </LoadingContext.Provider>
    </AuthContext.Provider>;
}

export default AuthContext;