import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loadind: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loadind = true;
            state.error = null;
        },
        sigInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loadind = false;
            state.error = null;
        },
        sigInFailure: (state, action) => {
            state.currentUser = null;
            state.loadind = false;
            state.error = action.payload;
        }
    }
});

export const { 
    signInStart, 
    sigInSuccess, 
    sigInFailure
 } = userSlice.actions;

 export default userSlice.reducer;