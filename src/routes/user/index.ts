import { FastifyPluginAsync } from "fastify";
 import { CreateUserRequest, CreateUserRequestOpts } from "./user.schema.js";
import { createUserHandler } from "./user.handler.js";

const userRoute:FastifyPluginAsync=async(fastify, opts):Promise<void> =>{
    fastify.post<CreateUserRequest>('/',CreateUserRequestOpts,createUserHandler)
    fastify.get('/',(req,res)=>{
        console.log("requested")
    })
}
export default userRoute;