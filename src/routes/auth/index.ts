import { FastifyPluginAsync } from "fastify";
import { AuthLoginRequest, AuthLoginRequestOpts } from "./auth.schema.js";
import { LoginHandler } from "./auth.handler.js";

const authRoute: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post<AuthLoginRequest>('/login',AuthLoginRequestOpts,LoginHandler)
};
export default authRoute;