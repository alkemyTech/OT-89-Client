import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import categoriesReducer from './slices/categoriesSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer
  }
});