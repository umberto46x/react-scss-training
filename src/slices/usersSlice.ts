import { createSlice } from "@reduxjs/toolkit";




const usersSlice = createSlice({
    name:"users",
    initialState:{
        entities: [],
        loading: "idle",
        error:null
    },
    reducers:{

    }
})