import { RouteShorthandOptions } from "fastify";


export interface AuthLoginRequest {
    Body:{
        username:string,
        password:string
    }
}
export const userTypeObject ={
    type:'object',
    properties: {
        id: {type: 'number'},
        name: {type: 'string'},
        email: {type: 'string'},
        phone: {type: 'string'},
        username: {type: 'string'},
        role: {type: 'string'},
        validity: {type: 'number'},

    }
}


export const AuthLoginRequestOpts: RouteShorthandOptions={
   schema:{
        body:{
            type:'object',
            required:['username', 'password'],
            properties:{
                username:{type:'string', minLength:5, maxLength:10},
                password:{type:'string', minLength:8, maxLength:16, pattern:'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$'}
            }
        },
        response:{
            200:{
                properties:{
                    success:{type:'boolean'},
                    message:{type:'string'},
                    data:userTypeObject,
                    token:{type:'string'},
                    refreshToken:{type:'string'}
                }
            }
           
        }
   }
}