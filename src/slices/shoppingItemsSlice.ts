import { createAsyncThunk, createSlice, type SerializedError } from "@reduxjs/toolkit"; 
import type { State } from "../stores/store";



export interface Item {
    id:string,
    name:string,
    quantity:number,
    wasBought:boolean
}
interface initialStateType {
    items:Item[],
    loadingStatus:"idle"|"pending"|"fulfilled"|"rejected",
    uploadingStatus:"idle"|"pending"|"fulfilled"|"rejected",
    error:SerializedError|null
}

const initialState: initialStateType = {
    items:[],
    loadingStatus:"idle",
    uploadingStatus:"idle",
    error:null
}


export const getItemsFromLS = createAsyncThunk("shoppingItems/getItemsFromLS", 
                async (_,thunk)=> {
                    console.log("sono dentro get items from ls")
                    const items  = await localStorage.getItem("items");
                    console.log(items)
                    if(items){
                            const parsedItems = JSON.parse(items);
                            if(parsedItems.length > 0){
                                console.log(parsedItems)
                                console.log("dati caricati correttamente dal LS")
                                return parsedItems
                            }
                    }else{
                     console.log("Local storage is empty");
                     thunk.abort("Empty LS")

                    }
                    
                    
                    
                }
)

export const setItemsToLS = createAsyncThunk("shoppingItems/setItemsToLS", 
                async (_,thunkAPI)=> {
                        
                     const {shoppingItems:{items}} = thunkAPI.getState() as State ; 
                    
                    
                    if(items.length !== 0){
                        await localStorage.clear();
                        await localStorage.setItem("items",JSON.stringify(items))
                        return "Items successfully added to the LocalStorage"
                    }else{
                        return "No items are  inside the store, no items have been added to the LocalStorage"
                    }
                   

                    
                
                    
                }
)




const shoppingItemsSlice = createSlice({
    name:"shoppingItems",
    initialState,
    reducers:{
        addItem: (s,{payload}) => {
                console.log(payload)
                if(payload){
                    s.items.push(payload)
                    s.uploadingStatus="idle";
                }
              
        },
        removeItem: (s,{payload}) => {
                if(payload && typeof payload === "string"){
                 const i =  s.items.findIndex(item => item.id === payload)
                 s.items.splice(i,1);
                 s.uploadingStatus="idle"
                }
               
        },
        togglePurchased: (s,{payload})=> {
                if(payload && typeof payload === "string"){
                    const purchasedItem = s.items.find(item => item.id === payload);
                    if(purchasedItem){
                        purchasedItem.wasBought=true;
                        s.uploadingStatus = "idle"
                    }
                }
              
                
                
        },
        updateQuantity: (s,{payload}) => {
                console.log(payload);
                if(payload && typeof payload.id === "string" && typeof payload.quantity === "number"){
                    const itemToUpdate = s.items.find(item => item.id === payload.id);
                    if(itemToUpdate){
                        itemToUpdate.quantity = payload.quantity;
                        s.uploadingStatus = "idle"

                    }
                }
                
        },
        editItemName: (s,{payload}) => {
                console.log(payload)
                if(payload && typeof payload.id === "string" && typeof payload.name === "string"){
                    const itemToEdit = s.items.find(item => item.id === payload.id);
                    if(itemToEdit){
                        itemToEdit.name = payload.name;
                        s.uploadingStatus = "idle"

                    }
                }
        }
    
    },
    selectors:{
        getAllItems:(state) => state.items,
        getState:(state) => state
    },
    extraReducers: builder => {
        builder
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .addCase(getItemsFromLS.pending,(s,_)=>{
                s.loadingStatus="pending";
        })
        .addCase(getItemsFromLS.fulfilled,(s,action) =>{
                if(action.payload){
                    s.loadingStatus="fulfilled"
                    s.items.push(action.payload)
                }
        })
        .addCase(getItemsFromLS.rejected,(s,action) =>{
                s.error=action.error
                s.loadingStatus="rejected"
                console.log(action.error)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }).addCase(setItemsToLS.pending,(s,_)=>{
                s.uploadingStatus="pending";
        })
        .addCase(setItemsToLS.fulfilled,(s,action) =>{
                if(action.payload){
                    s.uploadingStatus="fulfilled"
                   console.log(action.payload)
                }
        })
        .addCase(setItemsToLS.rejected,(s,action) =>{
                s.error=action.error
                s.uploadingStatus="rejected"
        })

    }

})



export const {addItem,removeItem,togglePurchased,editItemName,updateQuantity} = shoppingItemsSlice.actions
export const {getAllItems,getState} = shoppingItemsSlice.selectors

export const  shoppingItemsReducer = shoppingItemsSlice.reducer;