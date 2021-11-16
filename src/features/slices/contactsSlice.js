import { createSlice } from "@reduxjs/toolkit";

const initialStateValue=[]

export const contactsSlice=createSlice({
    name:'contacts',
    initialStateValue:{value:initialStateValue},
    reducers:{
        contactsList:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {contactsList}=contactsSlice.actions

export default contactsSlice.reducer;