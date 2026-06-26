export enum CategoryStatus {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE"
}

export interface IGetProductCategory {
  _id:string,
  title: string,
  createdAt:string,
  updatedAt:string,
  status: CategoryStatus
}



export interface IUploadCategory {
  title: string,
  status: CategoryStatus
}