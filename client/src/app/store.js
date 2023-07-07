import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/counter/counterSlice";
import usersReducer from "../components/users/usersSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: usersReducer
    }
});