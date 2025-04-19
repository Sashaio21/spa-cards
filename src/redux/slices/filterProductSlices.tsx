import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/products";


type Filter = Record<string, (string | number)[]>;

// тип для инициализации состояния
type ProductState = {
  filteredProduct: Product[]; // список отфлиьтрованных товаров
  filters: Filter; // все фильтры
  listProductFavorites: number[] // список избранных товаров
};


// инициализация состояния
const initialState: ProductState = {
  filteredProduct: [],
  filters: {},
  listProductFavorites: [],
};


// применение фильтра
// параметры: список который нужно отфильтровать, фильтры
function filterProductsByFilters(items: Product[], filters: Record<string, (string | number)[]>) {
  const filterKeys = Object.keys(filters);
  // если фильтров нет, вернуть весь список без изменений
  if (filterKeys.length === 0) return items;

  return items.filter((product) => {
    return filterKeys.every((key) => {
      const values = filters[key] as (string | number)[]; 
      const productValue = product[key as keyof Product];

      let normalized: string[] = [];

      if (Array.isArray(productValue)) {
        normalized = productValue.map(String);
      } else if (typeof productValue === "object" && productValue !== null) {
        normalized = Object.values(productValue).map(String);
      } else {
        normalized = [String(productValue)];
      }

      // возвращение списка отфильтрованных товаров
      return values.some(filterVal => normalized.includes(String(filterVal)));
    });
  });
}




const filteredProductSlice = createSlice({
  name: "productsFiltered",
  initialState,
  reducers: {
    // добваление товара в избраное 
    addItem: ((state,action:PayloadAction<number>)=>{
      state.listProductFavorites.push(action.payload)
    }),
    // удаление товара из избраных
    removeItem: ((state,action:PayloadAction<number>)=>{
        state.listProductFavorites = state.listProductFavorites.filter(favorites => favorites !== action.payload);
    }),
    // поиск товара по ключу title
    searchByTitle(
      state,
      action: PayloadAction<{ searchTerm: string; products: Product[] }>
    ) {
      const { searchTerm, products } = action.payload;
      const normalizedSearch = searchTerm.toLowerCase().trim();
    
      if (!normalizedSearch) {
        state.filteredProduct = filterProductsByFilters(products, state.filters);
        return;
      }
    
      const filtered = filterProductsByFilters(products, state.filters);
      state.filteredProduct = filtered.filter(product =>
        product.title.toLowerCase().includes(normalizedSearch)
      );
    }, 
    // возвращает список тоавров из избранных 
    filterFavorites(
      state,
      action: PayloadAction<{ shouldFilter: boolean; allProducts: Product[] }>
    ) {
      const { shouldFilter, allProducts } = action.payload;
    
      if (state.listProductFavorites.length === 0) {
        return;
      }
    
      if (shouldFilter) {
        state.filteredProduct = allProducts.filter((product) =>
          state.listProductFavorites.includes(product.id)
        );
      } else {
        state.filteredProduct = filterProductsByFilters(allProducts, state.filters);
      }
    },    
    // Устанавка фильтров
    setFilters(state, action: PayloadAction<{ key: string; values: (string | number)[] }>) {
      const { key, values } = action.payload;
    
      if (
        !Array.isArray(values) ||
        values.length === 0 ||
        values.every(val => val === null || val === undefined || val === "")
      ) {
        delete state.filters[key];
        return;
      }
      state.filters[key] = Array.from(new Set(values));
    },        
    // Применяем фильтры
    applyFilters(state, action: PayloadAction<Product[]>) {
      state.filteredProduct = filterProductsByFilters(action.payload, state.filters);
    },      
  },
});

export const {addItem,removeItem , filterFavorites,setFilters, applyFilters, searchByTitle } = filteredProductSlice.actions;
export default filteredProductSlice.reducer;
