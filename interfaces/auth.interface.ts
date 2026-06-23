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