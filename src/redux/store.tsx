import {configureStore} from "@reduxjs/toolkit"
import productReducer from './slices/productsSlice'
import filteredProduct from './slices/filterProductSlices'

export const store = configureStore({
    reducer: {
        products : productReducer,
        filteredProduct: filteredProduct
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch