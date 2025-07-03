import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
let scene ,camera,renderer,controls,skyBox;
let planetSun,planetMercury,planetVenus,planetEarth,planetMars,planetjupiter,planetneptune,planeturanus,planetsaturn;
let mercury_orbit_radius=50
let venus_orbit_radius=60
let earth_orbit_radius=70
let mars_orbit_radius=80
let jupiter_orbit_radius=100
let saturn_orbit_radius=120
let uranus_orbit_radius=140
let neptune_orbit_radius=160

let mercury_revolution_speed=2
let venus_revolution_speed=1.5
let earth_revolution_speed=1
let mars_revolution_speed=0.8
let jupiter_revolution_speed=0.7
let saturn_revolution_speed=0.6
let uranus_revolution_speed=0.5
let neptune_revolution_speed=0.4

function createMatrixArray(){
    const skyboxImagePaths= ['img/skybox/space_ft.png','img/skybox/space_bk.png','img/skybox/space_up.png','img/skybox/space_dn.png','img/skybox/space_rt.png','img/skybox/space_lf.png'];
    const materialArray= skyboxImagePaths.map((image)=>{
        let texture=new THREE.TextureLoader().load(image);
        return new THREE.MeshBasicMaterial({map:texture,side:THREE.BackSide})
    })
    return materialArray
}

function createRing(outerRadius){
    let innerRadius=outerRadius-0.1;
    let thetaSegment=64
    const geometry= new THREE.RingGeometry(innerRadius,outerRadius,thetaSegment);
    const material=new THREE.MeshBasicMaterial({color:' 0x888888',side:THREE.DoubleSide,opacity:0.6})
    const mesh=new THREE.Mesh(geometry,material);
    scene.add(mesh);
    mesh.rotation.x = Math.PI /2;
   
    return mesh;
}
function loadPlanetTexture(texture,radius,widthSegments,heightSegments,meshType){
    const geometry=new THREE.SphereGeometry(radius,widthSegments,heightSegments);
    const loader=new THREE.TextureLoader();
    const planetTexture=loader.load(texture);
    const material=new THREE.MeshBasicMaterial({map:planetTexture});
    const planet=new THREE.Mesh(geometry,material);
    return planet;
}

function setSkyBox(){
    const materialArray=createMatrixArray()
    let skyBoxGeo=new THREE.BoxGeometry(1000,1000,1000);
    skyBox=new THREE.Mesh(skyBoxGeo,materialArray);
    scene.add(skyBox);
}

function init(){
    scene=new THREE.Scene();
    camera=new THREE.PerspectiveCamera(
        85,
        window.innerWidth / window.innerHeight,
        0.1,
        1000

    )
    setSkyBox()
    planetSun=loadPlanetTexture("img/sun_hd.jpg ",20,100,100,'basic')
    planetMercury=loadPlanetTexture("img/mercury_hd.jpg ",2,100,100,'standard')
    planetVenus=loadPlanetTexture("img/venus_hd.jpg ",3,100,100,'standard')
    planetEarth=loadPlanetTexture("img/earth_hd.jpg ",4,100,100,'standard')
    planetMars=loadPlanetTexture("img/mars_hd.jpg ",3.5,100,100,'standard') 
    planetjupiter=loadPlanetTexture("img/jupiter_hd.jpg ",10,100,100,'standard')
    planetsaturn=loadPlanetTexture("img/saturn_hd.jpg ",8,100,100,'standard') 
    planeturanus=loadPlanetTexture("img/uranus_hd.jpg ",6,100,100,'standard')
    planetneptune=loadPlanetTexture("img/neptune_hd.jpg ",5,100,100,'standard')
    
    scene.add(planetSun)
    scene.add(planetMercury)
    scene.add(planetVenus)
    scene.add(planetEarth)
    scene.add(planetMars)
    scene.add(planetjupiter)
    scene.add(planetsaturn)
    scene.add(planeturanus)
    scene.add(planetneptune)

    createRing(mercury_orbit_radius)
    createRing(venus_orbit_radius)
    createRing(earth_orbit_radius)
    createRing(jupiter_orbit_radius)
    createRing(saturn_orbit_radius)
    createRing(mars_orbit_radius)
    createRing(uranus_orbit_radius)
    createRing(neptune_orbit_radius)

    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id= "c";
    controls=new OrbitControls(camera,renderer.domElement);
    controls.minDistance=12;
    controls.maxDistance=1000;
    camera.position.z=100;

     planetEarth.position.x = planetSun.position.x+earth_orbit_radius
}
function planetRevolver(time,speed,planet,orbitRadius,planetName){
     let orbitSpeedMultiplier=0.001;
    const planetOrbitAngle=time*orbitSpeedMultiplier*speed;
    planet.position.x = planetSun.position.x + orbitRadius * Math.cos(planetOrbitAngle)
    planet.position.z = planetSun.position.z + orbitRadius * Math.sin(planetOrbitAngle)
}
function animate(time){
    const rotationSpeed=0.008;
    planetSun.rotation.y +=rotationSpeed;
    planetMars.rotation.y +=rotationSpeed;
    planetMercury.rotation.y +=rotationSpeed;
    planetEarth.rotation.y +=rotationSpeed;
    planetjupiter.rotation.y +=rotationSpeed;
    planetVenus.rotation.y +=rotationSpeed;
    planetsaturn.rotation.y +=rotationSpeed;
    planetneptune.rotation.y +=rotationSpeed;
    planeturanus.rotation.y +=rotationSpeed;
   
   
  planetRevolver(time, mercury_revolution_speed, planetMercury, mercury_orbit_radius, 'mercury');
planetRevolver(time, venus_revolution_speed, planetVenus, venus_orbit_radius, 'venus');
planetRevolver(time, earth_revolution_speed, planetEarth, earth_orbit_radius, 'earth');
planetRevolver(time, mars_revolution_speed, planetMars, mars_orbit_radius, 'mars');
planetRevolver(time, jupiter_revolution_speed, planetjupiter, jupiter_orbit_radius, 'jupiter');
planetRevolver(time, saturn_revolution_speed, planetsaturn, saturn_orbit_radius, 'saturn');
planetRevolver(time, uranus_revolution_speed, planeturanus, uranus_orbit_radius, 'uranus');
planetRevolver(time, neptune_revolution_speed, planetneptune, neptune_orbit_radius, 'neptune');

     
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animate)


}

function onWindowResize(){
    camera.aspect=window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
}
window.addEventListener("resize",onWindowResize,false);

init()
animate(0)
