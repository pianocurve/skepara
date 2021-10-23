t=0
draw=_=>{t||createCanvas(W=600,W)
  FR=60;
  x=0;y=0;
  if(t%(FR*2)==0){
    background(0);
  }
  a=[[1,60],[2,0],[4,0],[8,0]]
  a.forEach(s=>{
    x+=sin(TWO_PI/FR/s[0]*t)*s[1];
  });
  b=[[1,60],[2,0],[4,0],[8,0]]
  b.forEach(s=>{
    y+=cos(TWO_PI/FR/s[0]*t)*s[1];
  });
  
  ellipse(x, y, 30);
  t+=2;

}