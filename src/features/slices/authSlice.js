import { createSlice } from '@reduxjs/toolkit';
import apiService from '../../services/server';

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

export const getUserAction = () => async dispatch => {
  try {
    const res = await apiService.get("/auth/me")
    dispatch(login(res.data.data))
  } catch (error) {
    console.log(error)
  }
}

export const removeUserAction = () => dispatch => {
  localStorage.removeItem("token")
  dispatch(logout())
}

export default authSlice.reducer;