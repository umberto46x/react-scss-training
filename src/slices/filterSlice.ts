import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface Filter {
    filter:"All"|"Not Completed"|"Completed";
}



const filterSlice = createSlice({
    name:"filter",
    initialState:"All" as unknown as Filter,
    reducers:{
        setFilter: (state,action:PayloadAction<Filter>) =>  state= action.payload
    }}) 



export const {setFilter} = filterSlice.actions
export const filterReducer = filterSlice.reducer