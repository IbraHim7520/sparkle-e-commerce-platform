export interface ICartItem {
  _id: string;
  productName: string;
  productPrice: number;
  discount?: number;
  images: string[];
  quantity: number;
  stock: number;
}

export interface IOrderCustomarInfo {
  customarName:string,
  customarAddress:string,
  customarPhone:string,
  customarAdditionalNotes:string
}