import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testimonials: [],
  selected: null,
};

export const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: initialState,
  reducers: {
    loadTestimonials: (state, action) => {
      state.testimonials = action.payload;
    },
    deleteTestimonials: (state, action) => {
      state.testimonials = state.testimonials.filter((a) => a.id !== action.payload);
    },
    editTestimonials: (state, action) => {
      const index = state.testimonials
        .map((testimonial) => testimonial.id)
        .indexOf(action.payload.id);
      state.testimonials[index] = action.payload;
    },
    selectTestimonials: (state, action) => {
      if (action.payload)
        state.selected = state.testimonials.filter(
          (testimonial) => testimonial.id === action.payload
        )[0];
      else state.selected = null;
    },
    addTestimonials: (state, action) => {
      state.testimonials.unshift(action.payload);
    },
  },
});

export const {
  deleteTestimonials,
  loadTestimonials,
  editTestimonials,
  selectTestimonials,
  addTestimonials,
} = testimonialSlice.actions;

export default testimonialSlice.reducer;
