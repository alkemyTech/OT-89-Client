import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: []
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    loadCategories: (state, action) => {
      state.categories = action.payload;
    },
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

export const { deleteCategory, addCategory, loadCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
