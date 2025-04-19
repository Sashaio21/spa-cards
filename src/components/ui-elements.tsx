import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";


// кастомная кнопка 
export const CustomButton = styled(Button)({
    backgroundColor: "#000",
    color: "#fff",
    padding: "6px 12px",
    "&:hover": {
      backgroundColor: "#115293",
    },
  });

// заголовок карточки товара
export const TitleProduct = ({children}:Readonly<{children: React.ReactNode;}>) => {
    return (
        <p 
            style={{
                fontWeight: "bold",
            }}
        >
            {children}
        </p>
    )
}



// описание карточки товара
export const TitleDescription = ({children}:Readonly<{children: React.ReactNode;}>) => {
    return (
        <p
        style={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2
        }}
        >{children}
        </p>
    )
}

// цена карточки товара со скидкой
export const PriceDiscountPercentage = ({children}:Readonly<{children: React.ReactNode;}>) => {
    return (
        <p
        style={{fontSize: "22px"}}
        >
            {children} $
        </p>
    )
}

// цена карточки товара без скидки (зачёркнутый)
export const PriceProduct = ({children}:Readonly<{children: React.ReactNode;}>) => {
    return (
        <p
            style={{
                fontSize: "18px",
                color: "#808080",
                textDecoration: "line-through"
            }}
        >{children} $</p>
    )
}
