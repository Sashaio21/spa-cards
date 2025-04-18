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
import EditIcon from '@mui/icons-material/Edit';
import { FavoriteBorder } from "@mui/icons-material";

type ProductData = {
    id: number,
    title: string,
    description: string
    price: number,
    discountPercentage: number,
}

export default function CardProduct({
    id, title, description, price, discountPercentage
}:ProductData) {
    const router = useRouter()
    const dispatch = useDispatch()
    
    const {listProductFavorites} = useSelector((state:RootState)=> state.filteredProduct)
    const addFavorites = (idProduct:number) => {
      dispatch(addItem(idProduct))
      console.log("favorites")
    }

    const DeleteFavorites = (idProduct:number) => {
      dispatch(removeItem(idProduct))
      console.log("favorites")
    }

    const deleteProductFun = () => {
      const confirmDelete = window.confirm("Вы точно хотите удалить товар?");
      if (confirmDelete) {
        dispatch(deleteProduct(id));
        console.log("Удалено:", id);
      }
    }


    const editProductFun = () => {
      const confirmDelete = window.confirm("Вы точно хотите отреадактировать товар?");
      if (confirmDelete) {
        dispatch(deleteProduct(id));
        console.log("Удалено:", id);
      }
    }

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
                <Image
                    src="/product_image.png"     
                    alt="Описание"
                    width={250}
                    height={250}
                />
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