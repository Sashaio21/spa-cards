import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/products";

type ProductsList = {
  product: Product[];
};



type ProductState = {
  items: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};




export const fetchGetProducts = createAsyncThunk<ProductsList>(
  "products/fetchGetProducts",
  async () => {
    const response = await fetch("https://67f93dad094de2fe6ea0ee4f.mockapi.io/products/product");
    if (!response.ok) {
      throw new Error("Не удалось загрузить данные");
    }
    const data = await response.json();
    return { product: data };
  }
);


export const fetchAddProduct = createAsyncThunk<Product, Product>(
  "products/fetchAddProduct",
  async (productData: Product) => {
    const response = await fetch("https://67f93dad094de2fe6ea0ee4f.mockapi.io/products/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить данные");
    }

    const data = await response.json();
    return data; // возвращаем только добавленный товар
  }
);


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    putProduct(
      state,
      action: PayloadAction<{ id: number; data: Partial<Omit<Product, 'id'>> }>
    ) {
      state.items = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.data } // обновляем только нужные поля
          : item
      );
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.product;
        state.error = null;
      })
      .addCase(fetchGetProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Не удалось загрузить данные";
      })
  },
});


export const {deleteProduct, putProduct} = productSlice.actions;
export default productSlice.reducer;
