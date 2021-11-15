import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const authSlice = createSlice({
    name: "users",
    initialState: { value: initialStateValue},
    reducers: {
        usersList: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {usersList} = authSlice.actions;

export default authSlice.reducer;