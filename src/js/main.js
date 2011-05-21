var shared = {

  mainCamera: new THREE.Camera(),
  freeCamera: new THREE.Camera(),
  ballCamera: new THREE.Camera(),
  
  scene: new THREE.Scene(),
  renderer: new THREE.WebGLRenderer(),

  mouse : { x: 0, y: 0, drag: false },

  width: window.innerWidth,
  height: window.innerHeight,
  halfWidth: window.innerWidth/2,
  halfHeight: window.innerHeight/2,

  currentScene: {
    id: '',
    ready: false
  },
  
  currentCamera: 0,
    
  container: {
  }

};

function initGame(sceneId)
{

  shared.currentScene.id = sceneId;
   
}

window.onload = function() {

  initCanvas();
  initRenderer();
  initModels();
  initEventListeners();

};