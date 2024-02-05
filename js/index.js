import * as THREE from 'three';
import frgmt from './shaders/shader01_frgmt.glsl';
import vrtx from './shaders/shader01_vrtx.glsl';


var container;
var headings;
var camera, scene, renderer;
var uniforms;


init();
animate();

//HEXDECIMAL TO RGB CONVERSION
function convertHexToGLSLRGB(hex){
    var r = parseInt(hex.substring(1,3),16)/255.0;
    var g = parseInt(hex.substring(3,5),16)/255.0;
    var b = parseInt(hex.substring(5,7),16)/255.0;
    return new THREE.Vector3(r,g,b);
}
function extractNumbersFromString(string){
    var numbers = string.match(/\d+/g).map(Number);
    console.log("numbers:"+ numbers);
    return numbers;
    
}
//INITIALIZE
function init(){
    headings = document.getElementById('headings');
    container = document.getElementById('container');
    camera = new THREE.Camera();
    camera.position.z = 1.0;
    scene = new THREE.Scene();
    var geometry = new THREE.PlaneBufferGeometry(2.0,2.0);

    uniforms = {
        //Uniforms origined in JS:
        u_time:{type:"f", value: 1.0},
        u_mouse:{type:"v2", value: new THREE.Vector2()},
        u_resolution:{type:"v2", value: new THREE.Vector2()},
        u_num_drops:{type:"f", value: 20.0},
        whole_size:{type:"f", value: 50.0},

        //Uniforms extracted from CSS Vars:
        ripple_base_size:{type:"f", value: 
        getComputedStyle(document.body).getPropertyValue('--ripples-width')},

        ripple_number:{type:"f", value:
        getComputedStyle(document.body).getPropertyValue('--ripples-number')},

        ripple_bleed:{type:"f", value:
        getComputedStyle(document.body).getPropertyValue('--ripple-bleed')},
    
        center_clear_area:{type:"f", value: 
        getComputedStyle(document.body).getPropertyValue('--center-clear-area')},

        primary_color:{type:"v3", value: 
        convertHexToGLSLRGB(getComputedStyle(document.body).getPropertyValue('--primary-color'))},

        secondary_color:{type:"v3", value: 
        convertHexToGLSLRGB(getComputedStyle(document.body).getPropertyValue('--secondary-color'))},

        speed_factor:{type:"f", value:
        getComputedStyle(document.body).getPropertyValue('--speed-factor')},

        direction:{type:"f", value:
        getComputedStyle(document.body).getPropertyValue('--direction')},
    }

    
    
    var material = new THREE.ShaderMaterial({
        uniforms:uniforms,
        vertexShader: vrtx,
        fragmentShader: frgmt

    });
    var mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
    //set container lowest z-index
    container.style.zIndex = -1;
    headings.style.zIndex = 2;

}
function setMousePosition(){
    
    uniforms.u_mouse.value.x = renderer.domElement.width;
    uniforms.u_mouse.value.y = renderer.domElement.height;
}
window.addEventListener('mousemove', (event) => {
    
       var mousePos = { x: event.clientX, y: event.clientY };
        uniforms.u_mouse.value.x = mousePos.x;
        uniforms.u_mouse.value.y = mousePos.y;
      });
function onWindowResize(event){
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;

}
function animate(){
    requestAnimationFrame(animate);
    render();

}
function render(){
    uniforms.u_time.value +=0.05;
    renderer.render(scene,camera);
}