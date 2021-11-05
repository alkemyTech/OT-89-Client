import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = false;

export const authSlice = createSlice({
    name: 'auth',
    initialState: { value: initialStateValue},
    reducers: {

      login: (state, action) => {
        state.value = action.payload;
      },

      logout: (state) => {
        state.value = initialStateValue;
      }
}});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;