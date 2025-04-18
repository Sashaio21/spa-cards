'use client'
import Image from "next/image";
import {useForm, SubmitHandler} from 'react-hook-form'
import type { Product } from "@/types/products";
import {Card} from "@mui/material";
import { Controller } from "react-hook-form";
import { Input, Select, MenuItem, TextField, Box } from "@mui/material";
import '../../globals.css'
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { putProduct } from "@/redux/slices/productsSlice";
import { fetchAddProduct, fetchGetProducts } from "@/redux/slices/productsSlice";
import { CustomButton } from "@/components/ui-elements";
import { useSearchParams } from 'next/navigation';


export default function CreateProduct() {
  const dispatch = useDispatch<AppDispatch>()
  const [oneProduct, setOneProduct] = useState<Product| null>(null)
  const {items} = useSelector((state: RootState)=> state.products)
  const [tags, setTags] = useState<string[]>([])
  const [inputTag, setInputTag] = useState<string>("")
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [urlImage, setUrlImage] = useState<string | null>(null)
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<Product>()

  

  const addTags = () => {
    const newTag = inputTag.trim();

    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setValue('tags', updatedTags);
    }

    setInputTag(''); // очищаем input после добавления
  }

  const removeTag = (item: string) => {
    const updatedTags = tags.filter((i) => i !== item);
    setTags(updatedTags);
    setValue('tags', updatedTags); // обновляем форму
  };

  useEffect(()=>{
    if (id) {
      const foundProduct:Product|null = items.find((p)=>p.id === Number(id)) || null
      console.log((id))
      
      setOneProduct(foundProduct)
      if (oneProduct) {
        reset(oneProduct);
      }
      console.log(oneProduct?.brand)
    }
  },[oneProduct])


  function pluckStringsOrNumbers<T, K extends keyof T>(
    items: T[],
    key: K
  ): (string | number)[] {
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
    const filtered = rawValues.filter(
      (v): v is string | number => typeof v === "string" || typeof v === "number"
    );
  
    return Array.from(new Set(filtered));
  }


  const onSubmit: SubmitHandler<Product> = async (data:Product) => {
      // Явное преобразование типов
      const transformedData: Product = {
        ...data,
        price: Number(data.price), // преобразование строки в число
        dimensions: {
          ...data.dimensions,
          width: Number(data.dimensions.width), // преобразование строки в число
          height: Number(data.dimensions.height), // преобразование строки в число
          depth: Number(data.dimensions.depth), // преобразование строки в число
        },
        discountPercentage: Number(data.discountPercentage), // преобразование строки в число
        weight: Number(data.weight)
      };
    
      console.log(transformedData);
      try {
        if (id) {
          const resultAction = await dispatch(putProduct({id: Number(id), data: transformedData}));
          dispatch(fetchGetProducts());
        } else if (!id){
          const resultAction = await dispatch(fetchAddProduct(transformedData));
          // Проверка на успешность
          if (fetchAddProduct.fulfilled.match(resultAction)) {
            console.log("Товар успешно добавлен:", resultAction.payload);
        }

          dispatch(fetchGetProducts());
        } else {
          console.error("Ошибка при добавлении товара");
        }
      } catch (err) {
        console.error("Ошибка при выполнении onSubmit:", err);
      }
  };
  
  const deleteImage = () => {
    setUrlImage(null);
    setValue("image", ""); // Очистка значения поля
  };
  

  
  
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
  
      if (!file.type.startsWith("image/")) {
        alert("Пожалуйста, выберите изображение (jpg, png, gif и т.д.)");
        return;
      }
      const fileName = file.name;
  
      setUrlImage(URL.createObjectURL(file));
      setValue("image", fileName, { shouldValidate: true });
    }
  };
  
  

  return (
    <div >
      <h2>Добавление товара</h2>
      <form 
      className="col"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        fontSize: "18px",
        gap: "15px",
        width: "80%",
        marginLeft: "10%"
      }}
      >
        <div>
        {!urlImage ? (
          <div>
            <CustomButton
              onClick={() => {
                if (inputFileRef.current) {
                  inputFileRef.current.click();
                }
              }}
            >
              Добавить изображение
            </CustomButton>
            <Controller
              name="image"
              control={control}
              rules={{ required: "Изображение обязательно" }}
              render={({ field }) => (
                <input
                  ref={inputFileRef}
                  type="file"
                  onChange={handleChangeFile}
                  hidden
                />

              )}
            />
            {errors.image && <p style={{ color: "#c95e4b" }}>{errors.image.message}</p>}
          </div>
        ) : (
          <div
            style={{
              width: "50%",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <img src={urlImage} alt="Uploaded preview" />
            <CustomButton onClick={deleteImage}>Удалить</CustomButton>
          </div>
        )}

        </div>
        <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>
            Заголовок
          </label>
          <Input
            {...register('title', { required: 'Введите заголовок' })}
            className="border p-2 w-[100%]"
          />
          {errors.title && <p style={{color:"#c95e4b"}}>{errors.title.message}</p>}
        </div>
        <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>
            Описание
          </label>
          <textarea
           {...register('description', { required: 'Введите описание' })}
            placeholder="Введите описание товара..."
            className="border border-gray-300 rounded-xl p-3 resize-none min-h-[90px] w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && <p style={{color:"#c95e4b"}}>{errors.description.message}</p>}
        </div>

        <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>
            Категория
          </label>
          <Controller
            name="category"
            control={control}
            rules={{ required: 'Выберите категорию' }}
            render={({ field }) => (
              <Select
                {...field}
                className="w-[100%]"
                value={field.value ?? ''} // защита от undefined
              >
                {pluckStringsOrNumbers(items, "category").map((obj, index) => (
                  <MenuItem key={index} value={obj}>
                    {obj}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.category && (
            <p style={{ color: "#c95e4b" }}>{errors.category.message}</p>
          )}
          {errors.category && <p style={{color:"#c95e4b"}}>{errors.category.message}</p>}
        </div>

        <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>
            Цена
          </label>
          <TextField
            type="number"
            inputProps={{ step: 0.01 }}
            fullWidth
            {...register('price', { required: 'УКажите цену' })}
          />
          {errors.price && <p style={{color:"#c95e4b"}}>{errors.price.message}</p>}
        </div>

        <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>
            Скидка (в процентах)
          </label>
          <TextField
            type="number"
            inputProps={{ step: 0.01 }}
            fullWidth
            {...register('discountPercentage', { required: 'УКажите цену' })}
          />
          {errors.discountPercentage && <p style={{color:"#c95e4b"}}>{errors.discountPercentage.message}</p>}
        </div>
        

        <Controller
  name="tags"
  control={control}
  rules={{ required: 'Добавьте хотя бы один тег' }}
  render={({ field }) => (
    <div className="col" style={{ alignItems: "center", gap: "10px", width: "100%" }}>
      <div className="row" style={{ alignItems: "center", gap: "10px", width: "100%" }}>
        <label>Теги</label>
        <div className="row" style={{ width: "100%" }}>
          <Input
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            className="border p-2 w-[100%]"
          />
          <CustomButton
            onClick={() => {
              if (inputTag.trim()) {
                const newTags = [...(field.value || []), inputTag.trim()];
                field.onChange(newTags);
                setInputTag('');
              }
            }}
          >
            Добавить
          </CustomButton>
        </div>
      </div>

      <ul style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {(field.value || []).map((tag, index) => (
          <li key={index}>
            <Card
              style={{
                padding: "10px",
                backgroundColor: "#EEEEEE",
                cursor: "pointer",
              }}
              onClick={() => {
                const updated = field.value.filter((t) => t !== tag);
                field.onChange(updated);
              }}
            >
              #{tag} &times;
            </Card>
          </li>
        ))}
      </ul>

      {errors.tags && <p style={{ color: "#c95e4b" }}>{errors.tags.message}</p>}
    </div>
  )}
/>
          
        <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>
            Бренд
          </label>

          <Controller
            name="brand"
            control={control}
            rules={{ required: 'Выберите бренд' }}
            render={({ field }) => (
              <Select
                {...field}
                className="w-[100%]"
                value={field.value ?? ''} // защита от undefined
              >
                {pluckStringsOrNumbers(items, "brand").map((obj, index) => (
                  <MenuItem key={index} value={obj}>
                    {obj}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.brand && <p style={{ color: "#c95e4b" }}>{errors.brand.message}</p>}

          {errors.brand && <p style={{color:"#c95e4b"}}>{errors.brand.message}</p>}
        </div>    

        <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>    
            Информация о гарантии
          </label>
          <Input
            {...register('warrantyInformation', { required: 'Введите информацию о гарантии' })}
            className="border p-2 w-[100%]"
          />
          {errors.warrantyInformation && <p style={{color:"#c95e4b"}}>{errors.warrantyInformation.message}</p>}
        </div>

        <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>
          Информация о доставке
          </label>
          <Input
            {...register('shippingInformation', { required: 'Введите информацию о доставке' })}
            className="border p-2 w-[100%]"
          />
          {errors.shippingInformation && <p style={{color:"#c95e4b"}}>{errors.shippingInformation.message}</p>}
        </div>


        <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>
            Политика возврата
          </label>
          <Input
            {...register('returnPolicy', { required: 'Введите политику возврата' })}
            className="border p-2 w-[100%]"
          />
          {errors.title && <p style={{color:"#c95e4b"}}>{errors.title.message}</p>}
        </div>
        
        
        <div className="row">
          <p >Размеры</p>
          <div
              style={{
              flex: 1,
              borderBottom: "1px dotted #636363",
              marginLeft: "5px",
              }}
          ></div>
        </div>

        <Box display="flex" gap={2}>
        <Controller
          name="dimensions.width"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              label="Ширина"
              type="number"
              inputProps={{ step: 0.01 }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="dimensions.height"
          control={control}
          rules={{ required: 'Укажите высоту' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ''} // <--- вот здесь защита от undefined
              label="Высота"
              type="number"
              inputProps={{ step: 0.01 }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />


      <Controller
        name="dimensions.depth"
        control={control}
        rules={{ required: 'Укажите глубину' }}
        defaultValue={0}  // Убедись, что defaultValue задано
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Глубина"
            type="number"
            inputProps={{ step: 0.01 }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
      />
      </Box>

      <div className="row"
        style={{
          alignItems: "center",
          gap: "10px",
          width: "100%"
        }}>
          <label>
            Вес
          </label>
          <TextField
              label="Глубина"
              type="number"
              inputProps={{ step: 0.01 }}
              fullWidth
              {...register('weight', { required: 'УКажите вес' })}
            />
          {errors.weight && <p style={{color:"#c95e4b"}}>{errors.weight.message}</p>}
        </div>

      <input
        type="hidden"
        {...register('tags', { required: 'Добавьте теги' })}
        value={JSON.stringify(tags)} // 👈 вот это правильно!
      />
        {id ? (
          <CustomButton type="submit" >Редактировать</CustomButton>
        ):(
          <CustomButton type="submit" >Добавить</CustomButton>
        )}
      </form>
      
    </div>
  );
}
