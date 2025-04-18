import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


type ListProduct = {
    favorites: number[]
}

const initialState:ListProduct = {
    favorites: []
}


const favoritesProductsSlice = createSlice({
    name: "favoritesProduct",
    initialState,
    reducers: {
        addItem: ((state,action:PayloadAction<number>)=>{
            state.favorites.push(action.payload)
        }),
        removeItem: ((state,action:PayloadAction<number>)=>{
            state.favorites = state.favorites.filter(favorites => favorites !== action.payload);
        }),       
    }
})

export const { addItem, removeItem } = favoritesProductsSlice.actions;
export default favoritesProductsSlice.reducer;