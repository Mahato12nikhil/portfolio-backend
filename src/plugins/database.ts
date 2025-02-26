import fp from 'fastify-plugin';
import FastifyMongodb, {FastifyMongoNestedObject, FastifyMongoObject} from '@fastify/mongodb';
// import { SequenceSchema } from '../models/sequence.js';
// import { COLL_SEQUENCES } from '../utils/constants.js';

export default fp(async (fastify, opts) => {
  const dbConnUrl = process.env.DB_CONN_URL;
  if (!dbConnUrl) {
    throw new Error('DB_CONN_URL not found.');
  }

  fastify.register(FastifyMongodb, {
    forceClose: true,
    url: process.env.DB_CONN_URL,
  });

  fastify.addHook('preHandler', (request, reply, done) => {
    request.mongo = fastify.mongo;
    request.getSequenceNextVal = fastify.getSequenceNextVal;
    done();
  });
});

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyRequest {
    mongo: FastifyMongoObject & FastifyMongoNestedObject;
    getSequenceNextVal(sequenceId: string): Promise<number>;
  }
  export interface FastifyInstance {
    getSequenceNextVal(sequenceId: string): Promise<number>;
  }
}