import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../slices/counterSlice";
import { todosReducer } from "../slices/todosSlice";
import { filterReducer } from "../slices/filterSlice";




export const store = configureStore({
    reducer:{
        counter:counterReducer,
        todos:todosReducer,
        filter:filterReducer
    }
})



export type State = ReturnType<typeof store.getState>