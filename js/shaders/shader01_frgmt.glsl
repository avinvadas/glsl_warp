#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;




void main(){
   vec2 st = gl_FragCoord.xy/u_resolution.xy;
   
   vec2 mouseRatio=  vec2(u_mouse.xy +0.1) / vec2(u_resolution.xy +0.21);
   
   st = st *2.0 -0.5;

 
   //setting center and placement:
 
  float pct = distance(vec2(pow(st.x, 0.33+mouseRatio.y), pow(st.y, pow(1.0-mouseRatio.x , 0.75))),vec2(0.5,0.5));
  

 //setting repetitional pattern:
  float d = 0.0;
  float ripple_size= 0.5;
  float wrap_size = 0.5;
  float ripple_number = 8.0;
  d = length( (pct-fract(u_time*0.01))) *1.25- 1.;
  vec2 dMouse = vec2(((pct * mouseRatio.x)+0.15-2.0)* 0.5, ((pct * mouseRatio.y)+0.15)*0.5);
 

 
  vec3 color= vec3(step(pct,wrap_size))-vec3(step(ripple_size, fract(d * ripple_number +( dMouse.y / dMouse.x) )))-
  vec3(smoothstep(0.5, 0.0, pct*1.75));
  
//inverting b/w
  vec3 color_invert = vec3(1.0-color);

//setting final frag shade:
   gl_FragColor = vec4( vec3(color),1.0);
}