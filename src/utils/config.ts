import { SwaggerOptions } from "@fastify/swagger";

export const RELATIVE_DIST_STATIC_FOLDER = '../public';

// route prefix for APIs
export const API_ROUTE_PREFIX = '/api/v1';

export const SWAGGER_CONFIG_OPTS: SwaggerOptions = {

    swagger: {
        info: {
            title: 'Portofolio API',
            description: `Nikhil's Portofolio API docs`,
            version: '0.0.1'
          },
          schemes: [ 'http', 'https' ],
          externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
          },
    },
  };