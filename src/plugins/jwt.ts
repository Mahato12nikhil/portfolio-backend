import { FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt';
import { API_ROUTE_PREFIX, REFRESH_TOKEN_EXPIRY, TOKEN_EXPIRY, UNPROTECTED_ROUTES } from '../utils/config.js';

export interface JWTPayload {
    username?: string;
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
    
    
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET_KEY || "",
    sign: { algorithm: 'HS256' }  
  });
  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    },
  );
    fastify.addHook('onRequest',async(request, reply)=>{
      const {routeOptions, method} = request;
      const routerPath=routeOptions.url;
      console.log("route"+routerPath)
      const url = routerPath?.endsWith('/') ? routerPath.slice(0, -1) : routerPath;
      if (url?.startsWith(API_ROUTE_PREFIX)) {
        const route = UNPROTECTED_ROUTES.find((e) => e.method === method && e.url === url);
        if (!route) {
          await fastify.authenticate(request, reply);
        }
      }
      console.log(""+'not protected route')
    })

    fastify.decorateRequest('generateToken',
      (username:string)=>{
        const token=fastify.jwt.sign({username},{expiresIn: TOKEN_EXPIRY})
       return token;
    })
    fastify.decorateRequest('generateRefreshToken',(username:string)=>{
      const token=fastify.jwt.sign({username},{expiresIn: REFRESH_TOKEN_EXPIRY})
      return token;
    })

})
declare module 'fastify'{
  export interface FastifyRequest{
    generateToken(username: string): string;
    generateRefreshToken(username: string): string;
  }
  export interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    generateToken(username: string): string;
    generateRefreshToken(username: string): string;
  }
}