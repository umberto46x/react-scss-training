import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface Todo{
    id:string,
    status:"Not Completed" | "Completed",
    description:string
}


export const todosSlice = createSlice({
    name: "todos",
    initialState:[] as Todo[],
    reducers:{
        
        addToDo: (state,action:PayloadAction<string>) => {
                    state = [...state,{id:String(Date()),description:action.payload,status:"Not Completed"}]},
        deleteToDo(state,action:PayloadAction<string>){
            state.filter(s => s.id !== action.payload)
        },
        toggleToDo: (state,action:PayloadAction<string>) => {
            const selectedToDo =  state.find(s => s.id === action.payload );
            if(selectedToDo){
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (selectedToDo!.status === "Completed") ? selectedToDo!.status= "Not Completed" : selectedToDo!.status = "Completed";
            return [...state.filter((t) => t.id !== action.payload),selectedToDo!]
                        }
            
        },

        }

})


export const {addToDo,deleteToDo,toggleToDo} = todosSlice.actions;
export const todosReducer = todosSlice.reducer