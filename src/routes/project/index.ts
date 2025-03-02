import { FastifyPluginAsync } from "fastify";
import { CreateProjectRequest, CreateProjectRequestOpts, GetProjectRequestOpts } from "./project.schema.js";
import { CreateProjectHandler, GetProjectHandler } from "./project.handler.js";

const projectRoute:FastifyPluginAsync=async(fastify, opts):Promise<void>=>{
    fastify.get('/',GetProjectRequestOpts,GetProjectHandler);
    fastify.post<CreateProjectRequest>('/create',CreateProjectRequestOpts,CreateProjectHandler);
}
export default projectRoute;