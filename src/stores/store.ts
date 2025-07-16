import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../slices/counterSlice";
import { todosReducer } from "../slices/todosSlice";
import { filterReducer } from "../slices/filterSlice";
import { usersReducer } from "../slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { shoppingItemsReducer } from "../slices/shoppingItemsSlice";




export const store = configureStore({
    reducer:{
        counter:counterReducer,
        todos:todosReducer,
        filter:filterReducer,
        users:usersReducer,
        shoppingItems:shoppingItemsReducer
    }
})



export type stateStore = typeof store
export type stateDispatch = typeof store.dispatch
export const useStateDispatch = useDispatch.withTypes<stateDispatch>()
export const useStateSelector = useSelector.withTypes<State>()
export type State = ReturnType<typeof store.getState>