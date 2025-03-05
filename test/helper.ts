import {loadEnv} from '../src/utils/loadEnv.js';
import fastify from 'fastify'
import {app} from '../src/app.js'
import * as tap from 'tap';
export type Test = typeof tap['Test']['prototype'];

const setupEnv=()=>{
    process.env.NODE_ENV='test'
    loadEnv();
}
async function build(t: Test){
    setupEnv();
    const fastify_app=fastify();

    void fastify_app.register(app,{isAwesomeApp:true});
    await fastify_app.ready();

     t.teardown(() => void fastify_app.close());

     return fastify_app;
}
export {build, setupEnv}