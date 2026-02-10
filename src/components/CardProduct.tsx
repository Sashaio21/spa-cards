'use client';
import Image from "next/image";
import { TitleDescription, TitleProduct, PriceProduct, PriceDiscountPercentage, CustomButton } from "./ui-elements";
import { Card } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/redux/slices/filterProductSlices";
import '../app/globals.css'
import { RootState } from "@/redux/store";
import { deleteProduct } from "@/redux/slices/productsSlice";
import { FavoriteBorder } from "@mui/icons-material";

// тип для хранение основной информации
type ProductData = {
    id: number,
    title: string,
    description: string
    price: number,
    discountPercentage: number,
}


// Карточка товара, с краткой информацией
// отображается на странице "Список товаров"
// параметры: id, title, description, price, discountPercentage
export default function CardProduct({
    id, title, description, price, discountPercentage
}:ProductData) {
    const router = useRouter()
    const dispatch = useDispatch()
    
    // Список id товаров добавленных в избранное
    const {listProductFavorites} = useSelector((state:RootState)=> state.filteredProduct)
    
    // добавление товара в избранное 
    const addFavorites = (idProduct:number) => {
      dispatch(addItem(idProduct))
      console.log("favorites")
    }


    // удаление товара из избранного 
    const DeleteFavorites = (idProduct:number) => {
      dispatch(removeItem(idProduct))
      console.log("favorites")
    }

    // удаление товара из общего хранилища store
    const deleteProductFun = () => {
      const confirmDelete = window.confirm("Вы точно хотите удалить товар?");
      if (confirmDelete) {
        dispatch(deleteProduct(id));
        console.log("Удалено:", id);
      }
    }

    // функция, которая перенаправляется на страницу товара
    const openProduct = () => {
      router.push(`/products/${id}`)
      console.log("open")
    }

    return (
        <Card 
            onClick={()=>openProduct()}
            className="col"
            style={{
              width: "250px",
              height: "390px"
              
            }}
            >
            <div style={{
                position: "relative"
            }}>
              {/* Изображение товара */}
                <div
                  style={{
                    width: 250,
                    height: 250,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed gray",
                    borderRadius: 8,
                    fontSize: 48,
                    color: "gray",
                  }}
                >
                  {image || "📦"} {/* Можно передать текст-иконку или emoji */}
                </div>
                {/* отображение пустого сердечка (FavoriteIcon) или заккращенного сердечка (FavoriteBorder) */}
                {/* проверка, есть ли id в списке listProductFavorites */}
                {listProductFavorites.includes(id) ? (
                  <FavoriteIcon 
                        onClick={(e) => {
                        e.stopPropagation();
                        DeleteFavorites(id);
                      }}
                      style={{
                          color: '#db4f21',
                          position: "absolute",
                          top: "10px",
                          right: '10px',
                          cursor: 'pointer'
                      }}
                  />
                ):(
                  <FavoriteBorder 
                        onClick={(e) => {
                        e.stopPropagation();
                        addFavorites(id);
                      }}
                      style={{
                          color: '#db4f21',
                          position: "absolute",
                          top: "10px",
                          right: '10px',
                          cursor: 'pointer'
                      }}
                  />
                )}
                {/* Иконка удаления товара */}
                <DeleteIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProductFun();
                    }}
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: '10px',
                        cursor: 'pointer'
                    }}
                />
                
            </div>
            {/* Отображение основной инофрмации */}
            <div 
              className="col"
              style={{
                padding: "5px",
                gap: "2px",
                flexGrow: 1,
                justifyContent: "space-between"
              }}
            >
              <div
                className="col"
                style={{
                  gap: "5px",
                }}
              >
                <TitleProduct>{title}</TitleProduct>
                <TitleDescription>{description}</TitleDescription>
                <div 
                  className="row"
                  style={{
                    gap: "35px"
                  }}
                >
                  <PriceDiscountPercentage>{(price-(discountPercentage*price/100)).toFixed(2)}</PriceDiscountPercentage>
                  <PriceProduct>{price}</PriceProduct>
                </div>
              </div>
              {/* кнопка в корзину */}
              <CustomButton 
              style={{
                alignItems:"flex-end"
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              >
                В корзину
              </CustomButton>
              </div>
        </Card>
    )
}
