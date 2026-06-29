export enum ProductStatus {
    IN_STOCK = "IN_STOCK",
    UPCOMING = "UPCOMING",
    OUT_OF_STOCK = "OUT_OF_STOCK",
}
export interface IUploadProductData {
    productName:string,
    productPrice: number,
    productCategoryId: string,
    productCategoryName: string,
    stock:number,
    discount?:number,
    productStatus: ProductStatus,
    images: string[] | FileList
    productSize: string,
    productColor: string,
    productDescription:string
    productAdditionalInfo?:string,
    tags?:string[]
    brandName:string,
    color: string[]
}

//  productName: z.string().min(1 , "Product name is required"),
//     productPrice: z.number().positive("Product price must be greater than 0"),
//     productCategoryName: z.string().min(1 , "Product category is required"),
//     categoryId: z.string("Category ID is required"),
//     stock: z.number().positive("Stock must be greater than 0"),
//     discount: z.number().optional(),
//     productStatus: z.enum(["IN_STOCK", "UPCOMING"]),
//     images: z.array(z.string()).min(1 , "Images are required"),
//     productSize: z.string().min(1 , "Product size is required"),
//     productColor: z.string().min(1 , "Product color is required"),
//     productDescription: z.string().min(1 , "Product description is required"),
//     productAdditionalInfo: z.string().optional(),
//     tags: z.array(z.string()).optional(),  


export interface IGetAllProductsData {
    _id:string
    productName: string;
    productPrice: number;
    productCategoryId: string;
    productCategoryName: string;
    stock: number;
    discount?: number;
    productStatus: ProductStatus;
    images: string[];
    productSize: string;
    productColor: string;
    productDescription: string;
    productAdditionalInfo?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
}