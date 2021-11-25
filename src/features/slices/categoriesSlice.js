import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: []
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (a) => a.id !== action.payload
      );
    },
    addCategory: (state, action) => {
      state.categories = action.payload
    },
  },
});

export const { deleteCategory, addCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
