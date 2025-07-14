import { createSlice } from "@reduxjs/toolkit";




export const counterSlice = createSlice({
    name:"counter",
    initialState:{
        value:0
    },
    reducers:{
        increment: (state) => {Math.min(10,(state.value+1))},
        decrement: (state) => {Math.max(0,(state.value-=1))},
        incrementByAmount:(state,{payload}) => {Math.min(10,(state.value = state.value+payload))},
        decrementByAmount:(state,{payload}) => {Math.max(0,(state.value = state.value-payload))},

    }
})

export const {increment,decrement,incrementByAmount,decrementByAmount} = counterSlice.actions;
export const counterReducer = counterSlice.reducer