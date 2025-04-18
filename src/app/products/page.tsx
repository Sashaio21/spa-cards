'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { applyFilters } from "@/redux/slices/filterProductSlices";
import CardProduct from "@/components/CardProduct";
import '../globals.css'
import {Pagination} from "@mui/material";
import FiltersBlock from "@/components/FiltersBlock";



export default function Products() {
  const colCards:number = 5


    const [favoritHidden, setFavoritHidden] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>();
  const {items} = useSelector((state: RootState)=> state.products)
  const {filteredProduct} = useSelector((state: RootState)=> state.filteredProduct)
  const [page, setPage] = useState<number>(1)
  


  const handleClick = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log((value-1)*5)
    console.log(((value-1)*5+5))
    setPage(value)
  }



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
        <FiltersBlock
          
        />
        <div 
        className="col"
        style={{
          gap:"30px"
        }}
        >
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
