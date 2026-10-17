import assert from 'node:assert/strict';
import {makeMap,Learner,evaluate,transition,MAPS,shortestRoute} from '../public/core.mjs';
for(let m=0;m<MAPS.length;m++){
 const map=makeMap(m);assert(Number.isInteger(shortestRoute(map)));assert(map.rows.every(r=>r.length===map.width));
 for(let p=0;p<3;p++){
  const agent=new Learner(map,p,42+p*133),before=evaluate(map,agent.snapshot());
  for(let e=0;e<2500;e++)agent.episode();const after=evaluate(map,agent.snapshot());
  console.log(JSON.stringify({map:m,agent:p,before:before.wins,after:after.wins,steps:after.meanSteps}));
  assert.equal(after.wins,30,'Trained policy must extract on every evaluation episode');assert(after.wins>before.wins);
  const copy=new Learner(map,p);copy.restore(agent.snapshot());assert.deepEqual(Array.from(copy.q),Array.from(agent.q));assert.equal(after.uniqueStarts,1);assert(after.meanSteps>=after.optimalSteps);const stable=copy.snapshot();for(const bad of [{...stable,alpha:-1},{...stable,profile:(p+1)%3},{...stable,episodes:-4},{...stable,history:[{episode:1,success:2}]},{...stable,recent:Array(101).fill({})}]){assert.throws(()=>copy.restore(bad));assert.deepEqual(copy.snapshot(),stable,'Rejected imports must not partially mutate the learner');}
 }
 const wall=transition(map,map.start,0);assert.equal(wall.state,map.start);assert(wall.reward<0);
}
console.log('Learning, map geometry, collisions, and policy restoration verified.');

assert.throws(()=>makeMap(99));console.log('Invalid import rejection is atomic; shortest-route reference and same-map evaluation scope verified.');
