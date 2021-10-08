//Skepara generated declaration.
let _V={};
_V['ver_89_2'] = 2;
_V['ver_102_2'] = 2;
_V['ver_109_3'] = 3;
_V['ver_138_1'] = 1;
_V['ver_146_2'] = 2;
_V['ver_156_1'] = 1;
_V['ver_169_3'] = 3;
_V['ver_176_7'] = 7;
_V['ver_187_100'] = 100;
_V['ver_244_8'] = 8;
_V['ver_250__005'] = .005;

t=0
draw=_=>{t||createCanvas(W=600,W,WEBGL)
background`#つぶやきProcessing`
T=t*PI
rotateY(T/_V['ver_89_2'])
rotateZ(T/_V['ver_102_2'])
w=W/_V['ver_109_3']
for(S=i=W;i--;pop())push(y=_V['ver_138_1']-(i/S)*_V['ver_146_2']),r=sqrt(_V['ver_156_1']-y*y),s=PI*(_V['ver_169_3']-sqrt(_V['ver_176_7']+cos(y+T)/_V['ver_187_100']))*i,x=cos(s)*r,z=sin(s)*r,translate(x*w,y*w,z*w),box(_V['ver_244_8'])
t+=_V['ver_250__005']}

//Skepara generated sliders.       
const sliders = document.createElement('div');
sliders.innerHTML+='<input type="range" value="2" min="0" max="100" step="1" oninput="_V[\'ver_89_2\']=Number(this.value);document.getElementById(\'ver_89_2\').value=Number(this.value)"><input id="ver_89_2" value="2" onchange="_V[\'ver_89_2\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="2" min="0" max="100" step="1" oninput="_V[\'ver_102_2\']=Number(this.value);document.getElementById(\'ver_102_2\').value=Number(this.value)"><input id="ver_102_2" value="2" onchange="_V[\'ver_102_2\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="3" min="0" max="100" step="1" oninput="_V[\'ver_109_3\']=Number(this.value);document.getElementById(\'ver_109_3\').value=Number(this.value)"><input id="ver_109_3" value="3" onchange="_V[\'ver_109_3\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="1" min="0" max="100" step="1" oninput="_V[\'ver_138_1\']=Number(this.value);document.getElementById(\'ver_138_1\').value=Number(this.value)"><input id="ver_138_1" value="1" onchange="_V[\'ver_138_1\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="2" min="0" max="100" step="1" oninput="_V[\'ver_146_2\']=Number(this.value);document.getElementById(\'ver_146_2\').value=Number(this.value)"><input id="ver_146_2" value="2" onchange="_V[\'ver_146_2\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="1" min="0" max="100" step="1" oninput="_V[\'ver_156_1\']=Number(this.value);document.getElementById(\'ver_156_1\').value=Number(this.value)"><input id="ver_156_1" value="1" onchange="_V[\'ver_156_1\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="3" min="0" max="100" step="1" oninput="_V[\'ver_169_3\']=Number(this.value);document.getElementById(\'ver_169_3\').value=Number(this.value)"><input id="ver_169_3" value="3" onchange="_V[\'ver_169_3\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="7" min="0" max="100" step="1" oninput="_V[\'ver_176_7\']=Number(this.value);document.getElementById(\'ver_176_7\').value=Number(this.value)"><input id="ver_176_7" value="7" onchange="_V[\'ver_176_7\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="100" min="0" max="100" step="1" oninput="_V[\'ver_187_100\']=Number(this.value);document.getElementById(\'ver_187_100\').value=Number(this.value)"><input id="ver_187_100" value="100" onchange="_V[\'ver_187_100\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="8" min="0" max="100" step="1" oninput="_V[\'ver_244_8\']=Number(this.value);document.getElementById(\'ver_244_8\').value=Number(this.value)"><input id="ver_244_8" value="8" onchange="_V[\'ver_244_8\']=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value=".005" min="0" max="100" step="0.1" oninput="_V[\'ver_250__005\']=Number(this.value);document.getElementById(\'ver_250__005\').value=Number(this.value)"><input id="ver_250__005" value=".005" onchange="_V[\'ver_250__005\']=Number(this.value)"><br>'
document.body.appendChild(sliders);

const memory =document.body.appendChild(document.createElement('textarea'));
memory.addEventListener('click', e=>e.target.value=JSON.stringify(_V));
memory.addEventListener('change', e=>_V = JSON.parse(e.target.value));
