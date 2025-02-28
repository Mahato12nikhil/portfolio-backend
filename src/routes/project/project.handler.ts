import { FastifyReply, FastifyRequest } from "fastify";
import { DB_PORTFOLIO } from "../../utils/config.js";
import { COLL_PROJECTS } from "../../utils/constants.js";
import { ProjectSchema } from "../../models/project.js";
import { CreateProjectRequest } from "./project.schema.js";

export const GetProjectHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const collProject = request.mongo.client.db(process.env.DB_PORTFOLIO).collection(COLL_PROJECTS);

        if (!collProject) {
            return reply.status(500).send({
                success: false,
                message: 'Database error',
                data: [] 
            });
        }

        const result = await collProject.find().toArray();

        return reply.status(200).send({
            success: true,
            message: "Projects fetched successfully",
            data: result
        });

    } catch (error) {
        return reply.status(500).send({
            success: false,
            message: 'Internal Server Error',
            data: [] 
        });
    }
};

type CrtPrjctRqst=FastifyRequest<CreateProjectRequest>;
export const CreateProjectHandler = async (req: CrtPrjctRqst, reply: FastifyReply) => {
    try {
        const collProject = req.mongo.client.db(DB_PORTFOLIO).collection(COLL_PROJECTS);

        if (!collProject) {
            return reply.status(500).send({
                success: false,
                message: 'Database error',
            });
        }
        const Project:ProjectSchema={
            name:req.body.name,
            description:req.body.description,
            startDate:req.body.startDate ?? undefined,
            endDate:req.body.startDate ?? undefined,
            link:req.body.link,
            tools:req.body.tools
        }
        await collProject.insertOne(Project);

        return reply.status(200).send({
            success: true,
            message: "Project inserted successfully",
        });

    } catch (error) {
        return reply.status(500).send({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
