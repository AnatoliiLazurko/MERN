import axios from "axios";
import { createContext, useReducer } from "react";

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

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async ({ email, password }) => {
        try {
            const res = await axios.post('http://localhost:4000/api/login', JSON.stringify({email, password}));
            localStorage.setItem('token', res.data.token);

        } catch (error) { 
            console.log(error);
        }
    }

    const register = () => {

    }

    const logout = () => {

    }

    const getUser = () => {

    }

    return <AuthContext.Provider value={{}}>
        { children }
    </AuthContext.Provider>;
}

export default AuthProvider;