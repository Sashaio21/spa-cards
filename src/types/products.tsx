


type Dimensions = {
    width: number,
    height: number,
    depth: number
  }

export  type Product = {
    id: number,
    image: string,
    title: string,
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    tags: string[],
    brand: string,
    dimensions: Dimensions,
    warrantyInformation: string,
    shippingInformation: string,
    returnPolicy: string,
    minimumOrderQuantity: number,
    sku: string,
    weight: number
    }



