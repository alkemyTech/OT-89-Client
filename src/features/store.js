import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    users: usersReducer
  }
});