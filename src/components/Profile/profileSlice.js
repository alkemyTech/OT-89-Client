import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: 0,
    firstName: '',
    lastName: '',
    email: ''
  },
  reducers: {
    setUser:(state, action) => {
      state.id = action.payload.userId,
      state.firstName = action.payload.userId,
      state.lastName = action.payload.userId,
      state.email = action.payload.userId
    }
  }
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;