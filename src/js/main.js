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

  }

};

window.onload = function() {

  initCanvas();
  initRenderer();
  initModels();

};