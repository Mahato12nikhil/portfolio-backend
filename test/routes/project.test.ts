import {test}  from 'tap'
import { build } from '../helper.js'


test('project routes',async (t)=>{
  const app=await build(t);

    const resProject = await app.inject({
        url: '/api/v1/project/',
        method: 'GET',
    });
    
    t.equal(resProject.statusCode,200);
})