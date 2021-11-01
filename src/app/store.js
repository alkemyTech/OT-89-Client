import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';


const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production"
});

export default store;

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
