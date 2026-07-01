export interface IUserRegister {
    username:string,
    email:string,
    password:string
    confirmPassword:string
}

export interface IUserLogin {
    email:string,
    password:string
}


export interface IGetAllUsers {
    _id:string,
    email:string,
    name:string,
    role:string,
    createdAt:string,
    updatedAt:string
}