import FiltresComponent from "./FiltresComponent"
import { Card, Switch, Input } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { filterFavorites, searchByTitle } from "@/redux/slices/filterProductSlices";




export default function FiltersBlock({}) {
    const {items} = useSelector((state: RootState)=> state.products)
    const {filteredProduct} = useSelector((state: RootState)=> state.filteredProduct)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>()
    
    const productSearch = (event :React.ChangeEvent<HTMLInputElement> ) => {
        console.log(event.target.value)
        dispatch(searchByTitle({ searchTerm: event.target.value, products: items }))
    }


    function getFavoritesProduct(e: React.ChangeEvent<HTMLInputElement>) {
        setIsChecked(e.target.checked)
        if (e.target.checked) {
            dispatch(filterFavorites({shouldFilter:true,allProducts:filteredProduct}))
        }else{
            dispatch(filterFavorites({shouldFilter:false,allProducts:items}))
        }
    }

    return(
        <div 
            className="row"
            style={{
                gap: "50px",
                justifyContent:"space-between"
            }}
        >
            <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px"
            }}
            >
            <Card
                className="row"
                style={{
                padding: "6px 12px",
                backgroundColor: "#EEEEEE",
                cursor:"pointer",
                alignItems: "center"
                }}
            >
                <p>Избранное</p>
                <Switch 
                    checked={isChecked}
                    onChange={getFavoritesProduct}
                />
            </Card>
            <FiltresComponent 
                keyName="category"
            />
            <FiltresComponent 
                keyName="tags"
            />
            </div>
            <div className="row">
                    <Input 
                        placeholder="поиск по каталогу..."
                        onChange={productSearch}
                        style={{
                            height: "35px",
                            width: "200px"
                        }}
                    />
                </div>
        </div>
    )
}