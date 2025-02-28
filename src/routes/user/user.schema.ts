import {RouteShorthandOptions} from 'fastify';

export interface CreateUserRequest{
    // Headers:{
    //     authorization:string
    // },
    Body:{
        name:string,
        email:string,
        phone:string,
        username:string,
        password?:string,
        role?:string,
        validity?:bigint
    }
}
export const CreateUserRequestOpts: RouteShorthandOptions={
    schema:{
        description: 'Create new user `name`,  `email`, `username`, `password`, `role`, `validity` is required',
        // headers:{
        //     type:'object',
        //     required:['authorization'],
        //     properties:{
        //         authorization:{type:'string'}
        //     }
        // },
        body: {
            type: 'object',
            required: ['name', 'email', 'username', 'password', 'role', 'validity'],
            properties: {
              name: {type: 'string', minLength: 1, maxLength: 100},
              email: {type: 'string', format:'email'},
              username: {type: 'string', maxLength:10},
              password: {type: 'string'},
              role:{type:'string'},
              validity:{type:'number'}
            },
          },
       response:{
        200: {
            type: 'object',
            properties: {
              success: {type: 'boolean'},
              message: {type: 'string'},
            }
        }
       }
    }
}