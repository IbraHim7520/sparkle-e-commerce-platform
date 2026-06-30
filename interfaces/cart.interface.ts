export interface IGetCartItem {
  _id: string;
  productName: string;
  productPrice: number;
  discount?: number;
  images: string[];
  quantity: number;
  productId:string
  selectedColor?:string,
  selectedSize?:string

}

export interface IOrderCustomarInfo {
  customarName:string,
  customarAddress:string,
  customarPhone:string,
  customarAdditionalNotes:string
}

export interface IOrderData {
  customarName:string,
  customarAddress:string,
  customarPhone:string,
  customarAdditionalNotes?:string
  cartIds:string[],
  produtcIds:string[]
}


export interface IGetMyOrderedData {
  customarName:string,
  customarAddress:string,
  customarPhone:string,
  customarAdditionalNotes:string,
  orderStatus:string,
  totalPrice:number,
  deliveryCharge:number,
  grandTotal:number,
  _id:string,
  createdAt:string,
  updatedAt:string,
  userId:string,
  Orderitems: [
    {
      image:string,
      productId:string,
      productName:string,
      productPrice:number,
      quantity:number,
      subtotalPrice:number
    }
  ]
  
}