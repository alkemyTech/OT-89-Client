import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  novelties: [],
  selected: {
    name: null,
    image: null,
    content: null,
    categoryId: null,
    id: null,
  },
};

export const noveltySlice = createSlice({
  name: "novelties",
  initialState: initialState,
  reducers: {
    loadNovelties: (state, action) => {
      state.novelties = action.payload;
    },
    deleteNovelty: (state, action) => {
      state.novelties = state.novelties.filter((a) => a.id !== action.payload);
    },
    editNovelty: (state, action) => {
      const index = state.novelties
        .map((novel) => novel.id)
        .indexOf(action.payload.id);
      state.novelties[index] = action.payload;
    },
    selectNovelty: (state, action) => {
      if (action.payload)
        state.selected = state.novelties.filter(
          (novel) => novel.id === action.payload
        )[0];
      else state.selected = initialState.selected;
    },
    editSelected: (state, action) => {
      state.selected = action.payload;
    },
    addNovelty: (state, action) => {
      state.novelties.unshift(action.payload);
    },
  },
});

export const {
  deleteNovelty,
  loadNovelties,
  editNovelty,
  selectNovelty,
  addNovelty,
  editSelected
} = noveltySlice.actions;

export default noveltySlice.reducer;
