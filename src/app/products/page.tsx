'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { applyFilters } from "@/redux/slices/filterProductSlices";
import CardProduct from "@/components/CardProduct";
import '../globals.css'
import {Pagination} from "@mui/material";
import FiltersBlock from "@/components/FiltersBlock";


// Страница, где отобржается список товаров и фильтры
export default function Products() {
    // Количество карточек товаров на одной странице
    const colCards:number = 5

    // Состояние для скрытия/отображения избранных товаров
    const [favoritHidden, setFavoritHidden] = useState<boolean>(false)

    // Получаем диспетчер для вызова действий Redux
    const dispatch = useDispatch<AppDispatch>();

    // Все товары из глобального состояния Redux
    const {items} = useSelector((state: RootState)=> state.products)

    // Отфильтрованные товары из глобального состояния Redux
    const {filteredProduct} = useSelector((state: RootState)=> state.filteredProduct)

    // Текущая страница для пагинации
    const [page, setPage] = useState<number>(1)

  

    // Отслеживание нажатия на элемент пагинации
    const handleClick = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value)
    }


    // Применение фильтров при изменении items
    useEffect(()=>{
      dispatch(applyFilters(items))
    },[items])




  return (
    <div 
      className="col"
      style={{
        gap:"20px"
      }}
    >
      {!favoritHidden?(
        <h2>Все товары</h2>
      ):(
        <h2>Избранное</h2>
      )}
        {/* Блок, в котором реализованы фильтры  */}
        <FiltersBlock/>
        <div 
        className="col"
        style={{
          gap:"30px"
        }}
        >
        {/* Список товаров */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "25px",
            width: "100%",
            justifyContent: "center"
          }}
          >
          {filteredProduct.slice((page-1)*colCards, ((page-1)*colCards+colCards)).map((obj, index) => (
            // Карточка товара с краткой информацией
            <CardProduct
              key={index}
              id={obj.id}
              title={obj.title}
              description={obj.description}
              price={obj.price}
              discountPercentage={obj.discountPercentage}
            />
          ))}
        </div>
        {/* Пагинация */}
        <Pagination
            style={{
              alignSelf: "center"
            }}
            page={page}
            count={Math.ceil(filteredProduct.length/5)} 
            onChange={handleClick}
            variant="outlined" 
            shape="rounded" />
        </div>
    </div>
  );
}
