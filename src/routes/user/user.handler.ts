import  { FastifyReply, FastifyRequest } from "fastify"
import { CreateUserRequest } from "./user.schema.js"
import { UserSchema } from "../../models/user.js";
import { COLL_USERS, USER_ID_SEQ } from "../../utils/constants.js";
// import { DB_PORTFOLIO } from "../../utils/config.js";

type CrtUsrFstReq=FastifyRequest<CreateUserRequest>;

export const createUserHandler=async(request:CrtUsrFstReq, reply: FastifyReply)=>{
    const collUser = request.mongo.client.db(process.env.DB_PORTFOLIO)?.collection<UserSchema>(COLL_USERS);

    
    const checkEmail=await collUser?.findOne({email:request.body.email});

    if(checkEmail){
        return reply.status(403).send({
            message:'user already exists'
        })
    }
    const user: UserSchema={
        id: await request.getSequenceNextVal(USER_ID_SEQ),
        name:request.body.name,
        email:request.body.email,
        phone:request.body.phone,
        username:request.body.username,
        password:request.body.password,
        role:request.body.role,
        validity:request.body.validity
    }
    const data=await collUser?.insertOne(user);
    if(data)
      return reply.status(200).send({message:'user added successfully',data:data?.insertedId})
    return reply.status(500).send({message:'something wrong'})


}