'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card } from "@mui/material";
import {Breadcrumbs} from "@mui/material";
import { CustomButton } from "@/components/ui-elements";
import CharacteristicProduct from "@/components/CharacteristicProduct";
import { PriceProduct, PriceDiscountPercentage } from "@/components/ui-elements";
import { useEffect, use, useState } from "react";
import Image from "next/image";
import "../../globals.css"
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/types/products";

type ProductPageProps = {
  params: Promise<{
    productSlug: string;
  }>;
}



// Страница продукта с более подробной информацией
export default  function Product({ params }: ProductPageProps) {
  const {items} = useSelector((state: RootState)=> state.products)
  // информация о текущем товаре 
  const [product, setProduct] = useState<Product | null>(null)
  // переменная, в которой хранится id текущего товара
  const { productSlug } = use(params);
  const router = useRouter()
  
  
  const editProductFun = () => {
    const confirmDelete = window.confirm("Вы точно хотите отреадактировать товар?");
    if (confirmDelete) {
      router.push(`/admin/create-product?id=${Number(product?.id)}`)
    }
  }

  // Поиск одного товара по id 
  useEffect(()=>{
    const foundProduct:Product|null = items.find((p)=>Number(p.id) === Number(productSlug)) || null
    setProduct(foundProduct || null)
    console.log(items.find((p)=>p.id === Number(productSlug)))  
  },[items])

  return (
    <div>
      <div>
        <div className="row"
          style={{
            gap:"20px",
            alignItems: "center"
          }}
        >
        {/* Кнопка назад */}
        <CustomButton
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
        >
        </CustomButton>
          <div>
          {/* Хлебные крошки */}
          <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link href="/">
            Главная
          </Link>,
          <Link href={"/products"}>
            Каталог
          </Link>,
          <Link href={"/products"}>
            {product?.category}
          </Link>,
          <p key="3" >
            {product?.title}
          </p>
        </Breadcrumbs>
          </div>
        </div>
        <div className="row" style={{justifyContent: "space-between", alignItems: "center"}}>
          <h2>{product?.title}</h2>
        </div>
      </div>
      <div 
        className="row"
        style={{
          justifyContent: "space-between"
        }}
      >
        <div
          className="col"
          style={{
            width:"70%",
            gap: "50px"
          }}
        >
          <div
            className="row"
            style={{
              width:"100%",
              gap: "50px",
            }}
          >
            <Image
              src="/gallery.png"     
              alt="Описание"
              width={300}
              height={300}
            />
            <div
              className="col"
              style={{
                width:"100%",
                gap: "20px",
              }}
              >
              {/* Отображение характеристик с помощью компонента CharacteristicProduct */}
              <CharacteristicProduct
                characteristics={{
                  "Категория": product?.category ? String(product?.category) : "Не указано",
                  "Бренд": product?.brand ? String(product?.brand) : "Не указано",
                  "В наличии": product?.shippingInformation ? String(product?.shippingInformation) : "Не указано",
                  "Минимальное кол-во при заказе": !isNaN(Number(product?.minimumOrderQuantity)) ? Number(product?.minimumOrderQuantity) : "Не указано"
                }}
              />
              {/* Отображение списка тегов */}
              <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap:"15px"
              }}
              >
                  {product?.tags.map((obj,index)=>(
                    <li key={index}>
                      <Card
                      style={{
                        padding:"10px",
                        backgroundColor: "#EEEEEE",
                        cursor:"pointer"
                      }}
                      >
                          #{obj}
                      </Card>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="col">
            <div>
            </div>
            <h2>
              Описание товара
            </h2>
            <p>{product?.description}</p>
            <h2>
              Характеристики товара
            </h2>
            {/* Отображение характеристик с помощью компонента CharacteristicProduct */}
            <CharacteristicProduct
              characteristics={{
                "Гарантия": product?.warrantyInformation ? String(product?.warrantyInformation) : "Не указано",
                "Доставка": product?.shippingInformation ? String(product?.shippingInformation) : "Не указано",
                "Политика возврата": product?.returnPolicy ? String(product?.returnPolicy) : "Не указано",
              }}
            />
            <div 
            className="row"
            style={{margin: "10px 0px"}}
            >
              <p >Размеры</p>
              <div
                  style={{
                  flex: 1,
                  borderBottom: "1px dotted #636363",
                  marginLeft: "5px",
                  }}
              ></div>
            </div>
            {/* Отображение характеристик с помощью компонента CharacteristicProduct */}
            <CharacteristicProduct
              characteristics={{
                "Ширина": isNaN(Number(product?.dimensions.width)) ? "Неизвестно" : Number(product?.dimensions.width),
                "Высота": isNaN(Number(product?.dimensions.height)) ? "Неизвестно" : Number(product?.dimensions.height),
                "Глубина": isNaN(Number(product?.dimensions.depth)) ? "Неизвестно" : Number(product?.dimensions.depth),
                "Вес": isNaN(Number(product?.weight)) ? "Неизвестно" : Number(product?.weight),
              }}
            />
          </div>
        </div>
        {/* Блок для отображения информации о цене */}
        <Card
          className="col"
          style={{
            width: "20%",
            padding: "20px",
            height: "110px",
            backgroundColor: "#EEEEEE",
            gap: "10px"
          }}
        >
          <div 
          className="row"
          style={{
            gap:"10px",
            alignItems: "center"
          }}
          >
            {/* Цена товара */}
            <PriceProduct>
              {product?.price}
            </PriceProduct>
            <div
            style={{
              padding: "6px 12px",
              backgroundColor:"#000000",
              color: "#fff",
              borderRadius:"6px"
            }}
            >
              -{(product?.discountPercentage)?.toFixed(0)}%
            </div>
          </div>
          {/* Цена со скидкой */}
          <PriceDiscountPercentage >
          {(product?.price && product?.discountPercentage 
          ? (product.price - (product.discountPercentage * product.price / 100)).toFixed(2) 
          : '0.00')}
          </PriceDiscountPercentage>
          <CustomButton>Добавить в корзину</CustomButton>
        </Card>
      </div>
      <button onClick={()=>console.log(items.find((p)=>p.id === Number(productSlug)))}>test</button>
    </div>
  );
}