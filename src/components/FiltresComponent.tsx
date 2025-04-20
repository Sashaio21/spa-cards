import {Card,Popover} from "@mui/material";
import { useEffect, useState } from "react";
import {FormGroup, FormControlLabel, Checkbox} from "@mui/material";
import { useSelector } from "react-redux";
import { CustomButton } from "./ui-elements";
import { setFilters, applyFilters } from "@/redux/slices/filterProductSlices";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import type { Product } from "@/types/products";
import { pluckStringsOrNumbers } from "@/utilites/globalUtilites";

type FiltresComponentProps = {
    keyName: string;
  }


type CheckedItems = {
  [key: string]: boolean;
};


// компонент реализует логику фильтрации по определнному ключ keyName
export default function FiltresComponent({keyName}:FiltresComponentProps) {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    // хранит список всех товаров
    const {items} = useSelector((state: RootState)=> state.products)

    // сосстояние для отслежвания, выбран ли пункт списка для фильтра
    const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
    // хранит список фильтров (filters), которые выводится на странице
    const {filters} = useSelector((state: RootState)=> state.filteredProduct)

    function capitalize(str: string): string {
      if (!str) return str;                          
        return str[0].toUpperCase() + str.slice(1);
    }

    const test = () => {
      console.log(checkedItems)
    }



    // отслежвание выбора элемента списка
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      setCheckedItems((prev) => ({
        ...prev,
        [name]: checked,
      }));
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

  // применение фильтра
  const handleDone = (keyName: string) => {
    const values = Object.entries(checkedItems)
      .filter(([_, value]) => value)
      .map(([key]) => key);
  
    const filterObject = {
      [keyName]: values,
    };
  
    console.log("Выбрано:", filterObject);
  
    dispatch(setFilters({ key: keyName, values: filterObject[keyName] }));  // добавление нового фильтра
    dispatch(applyFilters(items)); // применение фильтров
    setOpen(false) // закрытие модального окна
  };


  useEffect(() => {
    const result: CheckedItems = {};
    console.log("список товаров");
  
    for (const values of Object.values(filters)) {
      for (const value of values) {
        result[String(value)] = true;
      }
    }
  
    console.log(result);
    setCheckedItems(result);
  }, []);
  

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
          {/* заголовок */}
          {capitalize(keyName)}
          {/* модальное окно */}
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
                {/* список элементов для фильтра */}
                {pluckStringsOrNumbers(items, keyName as keyof Product).map((label) => (
                  <FormControlLabel
                    key={label}
                    control={
                      <Checkbox
                        checked={checkedItems[label] || false}
                        onChange={handleChange}
                        name={String(label)}
                      />
                    }
                    label={label}
                  />
                ))} 
              </FormGroup>
              {/* кнопка для применения фильтра */}
              <CustomButton onClick={()=>handleDone(keyName)}>Готово</CustomButton>
            </Card>
          </Popover>
        </Card>
    )
}