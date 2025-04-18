import {Card,Popover} from "@mui/material";
import { useState } from "react";
import {FormGroup, FormControlLabel, Checkbox} from "@mui/material";
import { useSelector } from "react-redux";
import { CustomButton } from "./ui-elements";
import { setFilters, applyFilters } from "@/redux/slices/filterProductSlices";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import type { Product } from "@/types/products";






type FiltresComponentProps = {
    keyName: string;
  }


type CheckedItems = {
  [key: string]: boolean;
};


export default function FiltresComponent({keyName}:FiltresComponentProps) {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    const {items} = useSelector((state: RootState)=> state.products)
    const {filters} = useSelector((state: RootState)=> state.filteredProduct)
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

    function capitalize(str: string): string {
      if (!str) return str;                          
        return str[0].toUpperCase() + str.slice(1);
    }

    function pluck<T, K extends keyof T>(items: T[], key: K): (T[K] extends (infer U)[] ? U : T[K])[] {
      const rawValues = items.flatMap(item => {
        const value = item[key];
        if (Array.isArray(value)) {
          return value;
        }
        if (typeof value === "object" && value !== null) {
          return Object.values(value);
        }
        return [value];
      });
      return Array.from(new Set(rawValues));
    }
    
    
    const rawValues = pluck(items, keyName as keyof Product);
    const labels = rawValues.filter(
      (v): v is string =>
        typeof v === "string" || typeof v === "number"
    );


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const test = (keyName:string) => {
    console.log(checkedItems["beauty"])
    console.log(filters)
  };
  
    
  // функция для открытия модального окна 
  const handleClick = (event:React.MouseEvent<HTMLElement>) => {
    console.log("test")
    if (!open) {
      setAnchorEl(event.currentTarget);
      setOpen(true)
    } else {
      setAnchorEl(null);
      setOpen(false)
    }
  }


  const handleDone = (keyName: string) => {
    const values = Object.entries(checkedItems)
      .filter(([_, value]) => value)
      .map(([key]) => key);
  
    const filterObject = {
      [keyName]: values,
    };
  
    console.log("Выбрано:", filterObject);
  
    dispatch(setFilters({ key: keyName, values: filterObject[keyName] })); 
    dispatch(applyFilters(items));
    setOpen(false)
  };
  

    return(
        <Card
          onClick={handleClick}
          className="row"
          style={{
            padding: "6px 12px",
            backgroundColor: "#EEEEEE",
            cursor:"pointer",
            alignItems: "center"
          }}
        >
          {capitalize(keyName)}
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: -8,
              horizontal: 'left',
            }}
            disableRestoreFocus
            aria-hidden={false}
            disableAutoFocus
            >
            <Card
            className="col"
            style={{
              padding: "10px",
              gap: "10px"
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}>
              <FormGroup>
                {labels.map((label) => (
                  <FormControlLabel
                    key={label}
                    control={
                      <Checkbox
                        checked={checkedItems[label] || false}
                        onChange={handleChange}
                        name={label}
                      />
                    }
                    label={label}
                  />
                ))} 
              </FormGroup>
              {/* <CustomButton onClick={()=>test(keyName)}>test</CustomButton> */}
              <CustomButton onClick={()=>handleDone(keyName)}>Готово</CustomButton>
            </Card>
          </Popover>
        </Card>
    )
}