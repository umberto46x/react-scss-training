import { createSlice, type PayloadAction } from "@reduxjs/toolkit";




export const counterSlice = createSlice({
    name:"counter",
    initialState:{
        value:0
    },
    reducers:{
        increment: (state) => {Math.min(10,(state.value+=1))},
        decrement: (state) => {Math.max(0,(state.value-=1))},
        incrementByAmount:(state,action:PayloadAction<number>) => {Math.min(10,(state.value = state.value+action.payload))},
        decrementByAmount:(state,action:PayloadAction<number>) => {Math.max(0,(state.value = state.value-action.payload))},

    }
})

export const {increment,decrement,incrementByAmount,decrementByAmount} = counterSlice.actions;
export const counterReducer = counterSlice.reducer