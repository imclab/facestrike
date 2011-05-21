var shared = {

  mouse : { x: 0, y: 0, drag: false },

  width: window.innerWidth,
  height: window.innerHeight,
  halfWidth: window.innerWidth/2,
  halfHeight: window.innerHeight/2,

  currentScene: {
    id: ''
  },

  config: {
    domSrc : ''
  },
  
  container: {
  }
  
  

};

function initGame(targetElement, sceneId, width, height)
{
   shared.width = width;
   shared.height = height;
   shared.currentScene.id = sceneId;
   shared.halfWidth = width/2;
   shared.halfHeight = height/2;
   shared.config.domSrc = targetElement;
   
}

window.onload = function() {

  initCanvas();
  initRenderer();
  initModels();
  initEventListeners();

};