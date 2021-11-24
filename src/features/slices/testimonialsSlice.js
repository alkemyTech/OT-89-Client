import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const testimonialSlice = createSlice({
    name: "testimonials",
    initialState: { value: initialStateValue},
    reducers: {
        testimonialsList: (state, action) => {
            state.value = action.payload;
        },
        deleteTestimonial: (state, action) => {
          state.testimonial = state.testimonial.filter((t) => t.id !== action.payload);
        },
    }
});

export const {testimonialsList,deleteTestimonial} = testimonialSlice.actions;

export default testimonialSlice.reducer;
