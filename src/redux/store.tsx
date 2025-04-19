import {configureStore} from "@reduxjs/toolkit"
import productReducer from './slices/productsSlice'
import filteredProduct from './slices/filterProductSlices'


// общее хранилилще store
export const store = configureStore({
    reducer: {
        products : productReducer, // хранит все товары 
        filteredProduct: filteredProduct // хранит все отфильтрованный товары
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch