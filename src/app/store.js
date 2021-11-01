import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../components/Profile/profileSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
