import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

export const contactSlice = createSlice({
    name: "contacts",
    initialState: { value: initialStateValue},
    reducers: {
        contactsList: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {contactsList} = contactSlice.actions;

export default contactSlice.reducer;