import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist'),port=Number(process.env.PORT??4320),types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.txt':'text/plain'};
http.createServer(async(req,res)=>{try{const route=new URL(req.url,'http://localhost').pathname,filename=path.resolve(root,'.'+decodeURIComponent(route==='/'?'/index.html':route));if(!filename.startsWith(root+path.sep))throw Error('Invalid path');const content=await readFile(filename);res.writeHead(200,{'Content-Type':types[path.extname(filename)]??'application/octet-stream'});res.end(content);}catch{res.writeHead(404);res.end('Not found');}}).listen(port,'0.0.0.0',()=>console.log('Neon Expedition: http://localhost:'+port));
