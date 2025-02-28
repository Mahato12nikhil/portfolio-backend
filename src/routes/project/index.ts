import { FastifyPluginAsync } from "fastify";
import { CreateProjectRequest, CreateProjectRequestOpts, GetProjectRequestOpts } from "./project.schema.js";
import { GetProjectHandler } from "./project.handler.js";

const projectRoute:FastifyPluginAsync=async(fastify, opts):Promise<void>=>{
    fastify.get('/',GetProjectRequestOpts,GetProjectHandler);
    fastify.post<CreateProjectRequest>('/create',CreateProjectRequestOpts,GetProjectHandler);
}
export default projectRoute;