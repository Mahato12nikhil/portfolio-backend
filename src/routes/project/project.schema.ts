import { RouteShorthandOptions } from "fastify";

const ProjectTypeObject={
    type:'object',
    properties:{
        name:{type:'string'},
        description:{type:'string'},
        startDate:{type:'string'},
        endDate:{type:'string'},
        link:{type:'string'},
        tools:{type:'array', items:{ type: 'string' }}
    }
}
export interface CreateProjectRequest{
    Headers:{
        authorization:true
    },
    Body:{
        name:string,
        description:string,
        link:string,
        tools:string[],
        startDate?:number,
        endDate?:number,
    }
}
export const CreateProjectRequestOpts: RouteShorthandOptions={
    schema:{
        headers:{
            type:'object',
            required:['authorization'],
            properties:{
                authorization:{type:'string'}
            }
        },
        body:{
            type:'object',
            required:['name', 'description', 'link', 'tools'],
            properties:{
                name:{type:'string', minLength:1},
                description:{type:'string', minLength:1},
                link:{ "type": "string", "format": "uri" },
                startDate:{ "type": "number"},
                endDate:{ "type": "number"},
                tools:{type:'array', items:{type:'string'}}
            }
        },
        response:{
            200:{
                type:'object',
                properties: {
                    success: {type: 'boolean'},
                    message:{type:'string'}
                }
            }
        }
    }
}

export const GetProjectRequestOpts: RouteShorthandOptions={
    schema:{
        response:{
            200:{
                type:'object',
                properties: {
                    success: {type: 'boolean'},
                    data: {
                        type:'array',
                        items:ProjectTypeObject
                    },
                    message:{type:'string'}
                }
            }
        }
    }
}   