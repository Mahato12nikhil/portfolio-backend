import { FastifyReply, FastifyRequest } from "fastify";
import { AuthLoginRequest } from "./auth.schema.js";
import { COLL_USERS } from "../../utils/constants.js";

type LoginRequest=FastifyRequest<AuthLoginRequest>;

export const LoginHandler=async(req: LoginRequest,reply: FastifyReply)=>{
    try{
        const userColl=req?.mongo.client.db(process.env.DB_PORTFOLIO).collection(COLL_USERS);
        if(!userColl)
         return reply.status(500).send({
            success:false,
            message:'database error'
        });
        const {username, password}=req?.body;

        const user =await userColl.findOne({username: username});

        if(!user){
            return reply.status(404).send({
                success:false,
                message:`user doesn't exist!`,
                token:"",
                refreshToken:""
            })
        }
        if(user.username!==username || user.password!==password){
            return reply.status(401).send({
                success:false,
                message:'username or password is worng.',
                token:"",
                refreshToken:""
            })
        }

        const token=req.generateToken(username);
        const refreshToken=req.generateRefreshToken(username);
        
        return  reply.status(200).send({
            success:false,
            message:'logged in successful',
            token:token,
            refreshToken:refreshToken
        })
    }
    catch(error){
        console.log(error)
        return reply.status(520).send({
            success:false,
            message:'something error',
            token:"",
            refreshToken:""
        }) 
    }
    
}