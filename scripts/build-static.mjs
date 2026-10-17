import {mkdir,cp,rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});
await mkdir('dist/vendor',{recursive:true});await cp('node_modules/three/build/three.module.js','dist/vendor/three.module.js');await cp('node_modules/three/build/three.core.js','dist/vendor/three.core.js');for(const [dir,files] of Object.entries({postprocessing:['EffectComposer','RenderPass','UnrealBloomPass','OutputPass','Pass','ShaderPass','MaskPass'],shaders:['CopyShader','LuminosityHighPassShader','OutputShader']})){await mkdir('dist/vendor/addons/'+dir,{recursive:true});for(const file of files)await cp('node_modules/three/examples/jsm/'+dir+'/'+file+'.js','dist/vendor/addons/'+dir+'/'+file+'.js');}await cp('node_modules/three/LICENSE','dist/vendor/THREE-LICENSE.txt');

const py=`import pathlib,zipfile
root=pathlib.Path.cwd()
with zipfile.ZipFile(root/'dist/neon-expedition-desktop.zip','w',zipfile.ZIP_DEFLATED) as z:
 for name in ['README.md','package.json','package-lock.json']:
  z.write(root/name,'neon-expedition/'+name)
 for folder in ['dist','public','scripts','tests']:
  for p in (root/folder).rglob('*'):
   if p.is_file() and p.suffix!='.zip':z.write(p,'neon-expedition/'+str(p.relative_to(root)))
`;
const packaged=spawnSync('python3',['-c',py],{stdio:'inherit'});if(packaged.status!==0)throw Error('Could not package desktop kit');
