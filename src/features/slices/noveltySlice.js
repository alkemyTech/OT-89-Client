import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  novelties: [],
  selected: null,
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
      else state.selected = null;
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
} = noveltySlice.actions;

export default noveltySlice.reducer;
