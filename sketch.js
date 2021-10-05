//Skepara generated declaration.
let ver_33_600 = 600;
let ver_57_200 = 200;
let ver_70___6 = -.6;

t=0
draw=_=>{t++||createCanvas(W=ver_33_600,W,WEBGL)
background(ver_57_200)
rotateX(ver_70___6)
rotateY(PI*t/300)
for(y=-5;y<=5;y++)for(x=-5;x<=5;x++)for(z=-5;z<=5;z++)
push(d=dist(x,y,z,0,0,0)/9)+translate(x*25,y*25,z*25)+pop(box(max(0,min(25,40*sin(PI*(d+t/100))))))}

//Skepara generated sliders.       
var sliders = document.createElement('div');
sliders.innerHTML+='<input type="range" value="600" min="0" max="100" step="1" oninput="ver_33_600=Number(this.value);document.getElementById(\'ver_33_600\').value=Number(this.value)"><input id="ver_33_600" value="600" onchange="ver_33_600=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="200" min="0" max="100" step="1" oninput="ver_57_200=Number(this.value);document.getElementById(\'ver_57_200\').value=Number(this.value)"><input id="ver_57_200" value="200" onchange="ver_57_200=Number(this.value)"><br>'
sliders.innerHTML+='<input type="range" value="-.6" min="0" max="100" step="1" oninput="ver_70___6=Number(this.value);document.getElementById(\'ver_70___6\').value=Number(this.value)"><input id="ver_70___6" value="-.6" onchange="ver_70___6=Number(this.value)"><br>'

document.body.appendChild(sliders);
      