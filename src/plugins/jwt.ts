import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt';

export interface JWTPayload {
    id: number;
    name?: string;
}
  
declare module '@fastify/jwt' {
    interface FastifyJWT {
      payload: JWTPayload;
      user: JWTPayload;
    }
}
  
export default fp (async(fastify, opts)=>{

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
        throw new Error('JWT_SECRET_KEY not found.');
    }
    
    
    fastify.register(fastifyJwt,{secret});

    //hooks for authenticate
    fastify.decorate('authenticate',async(request:FastifyRequest,reply:FastifyReply):Promise<void>=>{
        try {
            await request.jwtVerify();
          } catch (err) {
            reply.send(err);
          }
    })

})