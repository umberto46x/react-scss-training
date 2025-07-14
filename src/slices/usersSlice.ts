import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


type LoadingState= "idle" | "pending" | "succeeded" | "failed";


interface User{
    
    id:number,
    name:string,
    username:string,
    email:string,
    address: {
      street:string,
      suite:string,
      city:string,
      zipcode:string,
      gen: {
       lat:string,
       log:string
      }
    }
}

export const fetchUsers = createAsyncThunk("users/fetchUsers",async () => {
            const res = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
            console.log(res.data)
            return res.data;
})


const usersSlice = createSlice({
    name:"users",
    initialState:{
        entities: [] as User[],
        loading:"idle" as LoadingState,
        error: "" as string|undefined
    },
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = "pending";
        })
        .addCase(fetchUsers.fulfilled,(state,action) => {
            state.loading = "succeeded";
            state.entities = action.payload
        })
        .addCase(fetchUsers.rejected,(state,action)=> {
            state.loading = "failed";
            state.error = action.error.message;
        })
    }
})

export const usersReducer = usersSlice.reducer;