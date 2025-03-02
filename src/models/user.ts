export interface UserSchema {
    id: number;
    name:string,
    email:string,
    phone:string,
    username:string,
    password?:string,
    role?:string,
    validity?:bigint
}