import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: 0
}

export const couterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => { 
            state.value += 1;
        },
        decrement: (state, action) => { 
            state.value -= action.payload;
        }
    }
});


export const { increment, decrement } = couterSlice.actions;
export default couterSlice.reducer;