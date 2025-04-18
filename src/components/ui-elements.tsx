import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import type { InputHTMLAttributes } from 'react';


export const CustomButton = styled(Button)({
    backgroundColor: "#000",
    color: "#fff",
    padding: "6px 12px",
    "&:hover": {
      backgroundColor: "#115293",
    },
  });


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


export const PriceDiscountPercentage = ({children}:Readonly<{children: React.ReactNode;}>) => {
    return (
        <p
        style={{fontSize: "22px"}}
        >
            {children} $
        </p>
    )
}


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
