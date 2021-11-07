import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/slices/userSlice'
import authReducer from './features/slices/authSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer
  }
});