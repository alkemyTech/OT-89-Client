import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activities: [],
  selected: null,
};

export const activitySlice = createSlice({
  name: "activities",
  initialState: initialState,
  reducers: {
    loadActivities: (state, action) => {
      state.activities = action.payload;
    },
    deleteActivity: (state, action) => {
      state.activities = state.activities.filter(
        (a) => a.id !== action.payload
      );
    },
    editActivity: (state, action) => {
      const index = state.activities
        .map((novel) => novel.id)
        .indexOf(action.payload.id);
      state.activities[index] = {
        ...state.activities[index],
        ...action.payload,
      };
    },
    selectActivity: (state, action) => {
      if (action.payload)
        state.selected = state.activities.filter(
          (novel) => novel.id === action.payload
        )[0];
      else state.selected = null;
    },
    addActivity: (state, action) => {
      state.activities.unshift(action.payload);
    },
  },
});

export const {
  deleteActivity,
  loadActivities,
  editActivity,
  selectActivity,
  addActivity,
} = activitySlice.actions;

export default activitySlice.reducer;
