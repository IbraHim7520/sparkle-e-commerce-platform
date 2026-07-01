import { ZodStringFormat } from "better-auth";

export interface IGetAllReviews {
    _id:string,
    comment: string,
    rating: number,
    userId: string,
    username: string
    createdAt:string,
    productId:string
    updatedAt:string
}