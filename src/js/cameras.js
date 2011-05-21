shared.mainCamera = new THREE.Camera( 35, window.innerWidth / window.innerHeight, 10, 10000 );

shared.ballCamera = new THREE.Camera( 55, window.innerWidth / window.innerHeight, 10, 10000 );
shared.ballCamera.useTarget = false;
shared.ballCamera.rotation.y = Math.PI;

shared.freeCamera = new THREE.Camera( 35, window.innerWidth / window.innerHeight, 10, 10000 );
shared.freeCamera.position.x = 1000;
shared.freeCamera.position.y = 800;
shared.freeCamera.position.z = -1600;