export interface ICartItem {
  _id: string;
  productName: string;
  productPrice: number;
  discount?: number;
  images: string[];
  quantity: number;
  productId:string

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
