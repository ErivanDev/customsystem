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
  light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  textureLoader.load('textures/ground.png', function (texture) {
    var geometry = new THREE.PlaneBufferGeometry(2, 2);
    geometry.rotateX(-Math.PI / 2);
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    ground = new THREE.Mesh(geometry, material);
    scene.add(ground);
  });

  var loader = new THREE.JSONLoader();

  loader.load('./models/cabeca.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    cabeca = new THREE.SkinnedMesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );

    scene.add(cabeca);

    isLoaded = true;
  });

  loader.load('./models/tronco.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    tronco = new THREE.SkinnedMesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );

    scene.add(tronco);

    isLoaded = true;
  });

  loader.load('./models/calca.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    calca = new THREE.SkinnedMesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );

    scene.add(calca);

    isLoaded = true;
  });

  loader.load('./models/perna.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    perna = new THREE.SkinnedMesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );

    scene.add(perna);

    isLoaded = true;
  });

  loader.load('./models/braco.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    braco = new THREE.SkinnedMesh(
      geometry,
      new THREE.MeshFaceMaterial(materials)
    );

    scene.add(braco);

    isLoaded = true;
  });

  // var mtlload = new THREE.MTLLoader();
  // mtlload.setPath( 'models/' );
  // mtlload.load( 'eva-animated.head.mtl', function ( materials ) {

  //   materials.preload();

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

    // var objload = new THREE.OBJLoader();
    // // objload.setMaterials( materials );
    // objload.setPath( 'models/' );
    // objload.load( 'eva-animated.head.obj', function ( object ) {
    //   object.traverse(function(child) {
    //     console.log(child);
    //     if (child instanceof THREE.Mesh) {
    //       console.log(child)
    //       child.material.map = texture;
    //       console.log(texture);  
    //     }
        
    //     scene.add( object );
    //     console.log(object);
    //   });
    // })//, onProgress, onError );

  // } )
  var loader = new THREE.JSONLoader();

  loader.load('./models/eva-animated.json', function (geometry, materials) {
    materials.forEach(function (material) {
      material.skinning = true;
    });
    character = new THREE.SkinnedMesh(
      geometry,
    //new THREE.MeshFaceMaterial(materials)
      new THREE.MeshBasicMaterial({
        color: 0x00ff0077,
        wireframe: true
      })
    );

    console.log(character);

    mixer = new THREE.AnimationMixer(character);

    action.hello = mixer.clipAction(geometry.animations[ 0 ]);
    action.idle = mixer.clipAction(geometry.animations[ 1 ]);
    action.run = mixer.clipAction(geometry.animations[ 3 ]);
    action.walk = mixer.clipAction(geometry.animations[ 4 ]);

    action.hello.setEffectiveWeight(1);
    action.idle.setEffectiveWeight(1);
    action.run.setEffectiveWeight(1);
    action.walk.setEffectiveWeight(1);

    action.hello.setLoop(THREE.LoopOnce, 0);
    action.hello.clampWhenFinished = true;

    action.hello.enabled = true;
    action.idle.enabled = true;
    action.run.enabled = true;
    action.walk.enabled = true;

    scene.add(character);

    var objload = new THREE.OBJLoader();
    // objload.setMaterials( materials );
    // objload.setPath( 'models/' );
    // objload.load( 'untitled.obj', function ( object ) {
    //   object.traverse(function(child) {
    //     // console.log(child);
    //     if (child instanceof THREE.Mesh) {
    //       // console.log(child.merge);
    //       child.material.map = texture;
    //       console.log(child);

          // child.position.x = character.skeleton.bones[9].position.x;
          // child.position.y = character.skeleton.bones[9].position.y;
          // child.position.z = character.skeleton.bones[9].position.z;
          // console.log(character.skeleton.bones[9].position);
          // console.log(child.position);
          // child.rotation.x -= 1.5;
          // scene.add( child );        
          // for(var i=0; i<character.skeleton.bones.length;i++){
            // child.position.y -= 0.1;
            // child.rotation.x -= 3.14/2;
            // child.position.z += 1; 
            // var geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
            // var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
            // var cube = new THREE.Mesh( geometry, material );

            // var ballGeo = new THREE.BoxGeometry( 1, 1, 1 );
            // var material = new THREE.MeshPhongMaterial({color: 0xF7FE2E}); 
            // var ball = new THREE.Mesh(ballGeo, material);
            // console.log(character.skeleton.bones[9].rotation);

            // var pendulumGeo = new THREE.CylinderGeometry(1, 1, 1, 2);
            // ball.updateMatrix();
            // pendulumGeo.merge(new THREE.Geometry().fromBufferGeometry( child.geometry ), child.matrix);

            // var pendulum = new THREE.Mesh(pendulumGeo, material);
            // scene.add(child);
            // child.position.x = 0;
            // child.position.y = 0;
            // child.position.z = 0;
            // var geometry = child.geometry;
            // geometry.computeBoundingBox();   
            // center = geometry.boundingBox.getCenter();
            // child.localToWorld( center );

            // pivot.rotation.y += 0.01;
            // child.center();
            // var geometry = new THREE.Geometry().fromBufferGeometry( character.geometry );
            // geometry.merge(child.geometry, child.matrix);

            // character.add( child );
            // child.translateX( center.x * -1);
            // child.translateY( center.y * -1);
            // child.translateZ( center.z * -1);

            // pivot = new THREE.SkinnedMesh();
            // var geometry = new THREE.CylinderBufferGeometry( 5, 5, 5, 5, 15, 5, 30 );
// 
            // var mesh = new THREE.SkinnedMesh( geometry, material );
            // pivot.add( child );

            // pivot.add(character);
            // character1.rotation.z += 3.14;
            // character1.skeleton.bones.splice(0,9);
            // for(var i=character1.skeleton.bones.length;i>-1;i--){
            //   if(i > 9 ) character1.skeleton.bones.splice(i,1);
            // }

            var helper = new THREE.SkeletonHelper( character );
            helper.material.linewidth = 5;
            scene.add( helper );

            var geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
            var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
            var cube = new THREE.Mesh( geometry, material );

            console.log(braco);

            // character1.skeleton.bones[0].add(  cube  );
            character.skeleton.bones[9].add(cabeca.skeleton.bones[0]);
            character.skeleton.bones[7].add(tronco.skeleton.bones[0]);
            character.skeleton.bones[18].add(braco.skeleton.bones[0]);
            character.skeleton.bones[24].add(calca.skeleton.bones[0]);
            character.skeleton.bones[29].add(perna.skeleton.bones[0]);

            cabeca.skeleton.bones[0].position.set(0,0,0);
            cabeca.skeleton.bones[0].rotation.set(0,0,0);
            tronco.skeleton.bones[0].position.set(0,0,0);
            tronco.skeleton.bones[0].rotation.set(0,0,0);
            braco.skeleton.bones[0].position.set(0,0,0);
            braco.skeleton.bones[0].rotation.set(0,0,0);
            calca.skeleton.bones[0].position.set(0,0,0);
            calca.skeleton.bones[0].rotation.set(0,0,0);
            perna.skeleton.bones[0].position.set(0,0,0);
            perna.skeleton.bones[0].rotation.set(0,0,0);

            // console.log(character1);

            // Instantiate a loader
            var loader = new THREE.GLTFLoader();

            // Optional: Provide a DRACOLoader instance to decode compressed mesh data
            // THREE.DRACOLoader.setDecoderPath( 'https://threejs.org/examples/js/libs/draco/' );
            // loader.setDRACOLoader( new THREE.DRACOLoader() );

            // Load a glTF resource
            // loader.load(
            //   // resource URL
            //   'models/gltf.gltf',
            //   // called when the resource is loaded
            //   function ( gltf ) {

            //     scene.add( gltf.scene );

            //     gltf.animations; // Array<THREE.AnimationClip>
            //     gltf.scene; // THREE.Scene
            //     gltf.scenes; // Array<THREE.Scene>
            //     gltf.cameras; // Array<THREE.Camera>
            //     gltf.asset; // Object

            //   },
            //   // called when loading is in progresses
            //   function ( xhr ) {

            //     console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            //   },
            //   // called when loading has errors
            //   function ( error ) {

            //     console.log( 'An error happened' );

            //   }
            // );

            // pivot.rotateX( character.rotation.x * -1);
            // pivot.rotateX( 3.14/2 * -1 );
            // pivot.rotateY( character.skeleton.bones[9].rotation.y/2 * -1 );
            // pivot.rotateZ( character.skeleton.bones[9].rotation.z/2 * -1 );
// 
            // child.geometry.applyMatrix( new THREE.Matrix4().setTranslation( 0, 0, 0 ) );
            // child.rotateX( child.rotation.x * -1);
            // child.rotateY( child.rotation.y * -1);
            // child.rotateZ( child.rotation.z * -1);

            // var geometry = child.geometry;
            // geometry.computeBoundingBox();   
            // center = geometry.boundingBox.getCenter();
            // child.localToWorld( center );


            // console.log(child.rotation)

            // child.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );

            // var geometry = child.geometry;
            // geometry.computeBoundingBox();   
            // center = geometry.boundingBox.getCenter();
            // child.localToWorld( center );

            // var ballGeo = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
            // var material = new THREE.MeshPhongMaterial({color: 0xF7FE2E}); 
            // var ball = new THREE.Mesh(ballGeo, material);

            // child.position.x = 0;
            // child.position.y = 0;
            // child.position.z = 0;

            // scene.add(child);
            // console.log(ball.position);
  
            // console.log(center);
            // character.skeleton.bones[9].add( child );
            // child.position.y -= 0.03;// = new THREE.Vector3(0,1,0);
            // child.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0) );
            // console.log(child.position);
            // scene.add(child);
          // }
        // }

        // object.merge(character.skeleton.bones[9]);
        // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        // var cube = new THREE.Mesh( geometry, material );
        // character.skeleton.bones[9].add(  cube  );
        // console.log(object);
    //   });
    // })

    // var objload = new THREE.OBJLoader();
    // // objload.setMaterials( materials );
    // objload.setPath( 'models/' );
    // objload.load( 'eva_esquartejado.obj', function ( object ) {
    //     // object.traverse(function(child) {
    //     //   console.log(child);
    //     //   if (child instanceof THREE.Mesh) {
    //     //     console.log(child.merge);
    //     //     child.material.map = texture;  
    //     //     scene.add( child );
    //     //   }
    //     // })
    //     object.children.splice(8, 1, head);
    //     object.children.forEach(function(child){
    //       if (child instanceof THREE.Mesh) {
    //         child.material.map = texture;  
    //       }
    //     });
        
    //     // scene.add( object );
    //     // object.merge(character.skeleton.bones[9]);
    //     // character.skeleton.bones[9].add(  object  );
    //     console.log(object);
    //   // });
    // })

    //https://codepen.io/jgunnison/pen/LVZaBp
    // character.skeleton.bones[9].add( scene.children[3] );
  
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', onDoubleClick, false);
    console.log('Double click to change animation');
    animate();

    isLoaded = true;

    // action.idle.play();
  });

}

window.addEventListener("keypress", 

  function change(event){
    if(event.keyCode == 101){
      scene.children.splice(6,1);
      loader.load('./models/cabeca2.json', function (geometry, materials) {
        materials.forEach(function (material) {
          material.skinning = true;
        });
        novo = new THREE.SkinnedMesh(
          geometry,
          new THREE.MeshFaceMaterial(materials)
        );

        scene.add(novo);

        character.skeleton.bones[9].add(novo.skeleton.bones[0]);
        novo.skeleton.bones[0].position.set(0,0,0);
        novo.skeleton.bones[0].rotation.set(0,0,0);
      });
    }
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
  controls.update();
  render();

}

function render () {
  var delta = clock.getDelta();
  mixer.update(delta);
  renderer.render(scene, camera);
}
