import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  id: 0,
  firstName: '',
  lastName: '',
  email: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialStateValue},
  reducers: {

    setUser:(state, action) => {
      state.value = action.payload
    }
  }
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;