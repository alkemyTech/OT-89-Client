import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(a => a != action.payload);
        }
    }
});

export const { deleteCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;