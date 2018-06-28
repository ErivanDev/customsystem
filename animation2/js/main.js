var clock, container, camera, scene, renderer, controls, listener;

var ground, character;
var light;
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.JSONLoader();
var isLoaded = false;
var action = {}, mixer;
var activeActionName = 'idle';

var arrAnimations = [
  'idle',
  'walk',
  'run',
  'hello'
];
var actualAnimation = 0;

init();

function init () {
  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xff0000 );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2.5, 2.5);
  listener = new THREE.AudioListener();
  camera.add(listener);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(0, 0.6, 0);
  // Lights
  light = new THREE.AmbientLight(0x00ffff, 1);
  scene.add(light);

  textureLoader.load('textures/ground.png', function (texture) {
    var geometry = new THREE.PlaneBufferGeometry(2, 2);
    geometry.rotateX(-Math.PI / 2);
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    ground = new THREE.Mesh(geometry, material);
    scene.add(ground);
  });

  // instantiate a loader
  var texture = new THREE.Texture();

  var loader = new THREE.ImageLoader();
  // load a image resource
  loader.load(
    'models/eva-texture.png',
    function ( image ) {
      texture.image = image;
      texture.needsUpdate = true;  
      // console.log(texture.image);  
    }
  );

  var loader = new THREE.GLTFLoader();

  animations = [];
  loader.load( 'models/hello.gltf', function ( gltf ) {
    animations.push( gltf.animations[0] );
  } );
  loader.load( 'models/run.gltf', function ( gltf ) {
    animations.push( gltf.animations[0] );
  } );
  loader.load( 'models/walk.gltf', function ( gltf ) {
    animations.push( gltf.animations[0] );
  } );

  loader.load( 'models/eva.gltf', function ( gltf ) {

    bicho = gltf.scene.children[0];
    
    cabeca = bicho.children[1];

    atual = 0;

    animations = animations;
    mixer = new THREE.AnimationMixer( bicho );
    mixer.clipAction( animations[ atual ] ).play();
    scene.add( bicho );

  } );

  console.log('Double click to change animation');
  animate();

  isLoaded = true;

  // action.idle.play();
  // });

}

window.addEventListener("keypress", 

  function change(event){
    console.log(event.keyCode);
    if(event.keyCode == 101){
      bicho.children.splice(1,1);
    }
    if(event.keyCode == 114){
      bicho.children.splice(1,0,cabeca);
    }
  }

);


window.addEventListener("click", 

  function change(){
    mixer.clipAction( animations[ atual++ ] ).play();
  }

);

function fadeAction (name) {
  var from = action[ activeActionName ].play();
  var to = action[ name ].play();

  from.enabled = true;
  to.enabled = true;

  if (to.loop === THREE.LoopOnce) {
    to.reset();
  }

  from.crossFadeTo(to, 0.3);
  activeActionName = name;

}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

var mylatesttap;
function onDoubleClick () {
  var now = new Date().getTime();
  var timesince = now - mylatesttap;
  if ((timesince < 600) && (timesince > 0)) {
    if (actualAnimation == arrAnimations.length - 1) {
      actualAnimation = 0;
    } else {
      actualAnimation++;
    }
    fadeAction(arrAnimations[actualAnimation]);

  } else {
    // too much time to be a doubletap
  }

  mylatesttap = new Date().getTime();

}

function animate () {
  requestAnimationFrame(animate);
  // controls.update();
  render();

}

function render () {
  var delta = clock.getDelta();
  if ( mixer !== undefined ) {
    mixer.update( delta );
  }
  renderer.render(scene, camera);
}
