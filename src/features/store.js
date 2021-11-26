import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import categoriesReducer from "./slices/categoriesSlice";
import contactReducer from "./slices/contactsSlice";
import noveltyReducer from "./slices/noveltySlice";
import testimonialReducer from "./slices/testimonialSlice";
import activityReducer from "./slices/activitySlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    categories: categoriesReducer,
    contacts: contactReducer,
    novelties: noveltyReducer,
    testimonials: testimonialReducer,
    activities: activityReducer,
  },
});
