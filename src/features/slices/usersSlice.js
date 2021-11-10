import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [{
    userId: "1",
    firstName: "Leanne Graham",
    lastName: "Bret",
    email: "sincere@april.biz",
  },
  {
    userId: "2",
    firstName: "Ignacio",
    lastName: "Garcia",
    email: "ig.ignacio@gmail.com",
  },
  {
    userId: "3",
    firstName: "Mirna Ayelen",
    lastName: "Graham",
    email: "mirnaayelen@gmail.com",
  },
  {
    userId: "4",
    firstName: "Carlos",
    lastName: "Sanchez",
    email: "cs@gmail.com",
  }
];

export const authSlice = createSlice({
    name: "users",
    initialState: { value: initialStateValue},
    reducers: {

        usersList: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {usersList} = authSlice.actions;

export default authSlice.reducer;