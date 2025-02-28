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
  type RouteName={
    method:'POST' | 'GET',
    url:string
  } 

  export const REFRESH_TOKEN_EXPIRY='30d';
  export const TOKEN_EXPIRY='1d';


  export const DB_PORTFOLIO=process.env.DB_PORTFOLIO;

  export const  UNPROTECTED_ROUTES: RouteName[]=[
    {method: 'POST', url: '/api/v1/user/create'},
    {method: 'POST', url: '/api/v1/user'},
    {method:'GET', url:'/api/v1/project'},
    {method:'POST', url:'/api/v1/auth/login'}
  ]