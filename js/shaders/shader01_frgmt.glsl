
#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform float ripple_base_size;
uniform float whole_size;
uniform float ripple_number;
uniform float ripple_bleed;
uniform float center_clear_area;
uniform vec3 primary_color;
uniform vec3 secondary_color;
uniform float speed_factor;
uniform float direction;



void main(){
   vec2 st = gl_FragCoord.xy/u_resolution.xy;
   st = st *2.0 -0.5;
   vec2 mouseRatio=  vec2(u_mouse.xy ) / vec2(u_resolution.xy );
   vec2 dMouse = abs(vec2(0.5)- mouseRatio) ;
   

   //setting center and placement:
 
  float pct = pow(distance(sin(st)*2.0 , vec2(sin(1.0))),(abs( 1.0-dMouse.y)/ abs(1.0- dMouse.x))*3.0);


 //setting repetitional pattern:
  
   float ripple_size=  sin(ripple_base_size); //width of a single ripple
 //  whole_size = 15.; //overall size of the pattern
  //ripple_number = 3.0; //higher number = more ripples
  float d = length( (direction * pct- (u_time* (speed_factor*0.01)))); //distance from center
  
 

 
  vec3 ripples= vec3(
    
    step(pct,whole_size))-
    vec3(smoothstep(ripple_size,ripple_size+ ripple_bleed, fract(d * ripple_number)))* //dark rings
    vec3(smoothstep(ripple_size,ripple_size+ ripple_bleed, fract(d * ripple_number * 2.))); 
  
  vec3 levels = vec3(ripples );
//inverting b/w
vec3 bgColor = vec3(secondary_color);
vec3 levels_invert =  vec3(1.0 - levels);
vec3 color = ( vec3(levels_invert *bgColor)) + (primary_color * levels);
vec3 finalColor = color;
//write a function converting hexadecimal colors to d
//setting final frag shade:
   gl_FragColor = vec4( finalColor ,1.0);
}