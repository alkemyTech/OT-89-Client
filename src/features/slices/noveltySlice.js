import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    novelties: []
}

export const noveltySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        deleteNovelty: (state, action) => {
            state.novelties = state.novelties.filter(a => a.id != action.payload);
        }
    }
});

export const { deleteNovelty } = noveltySlice.actions;

export default noveltySlice.reducer;