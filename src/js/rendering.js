/**
 * Created by .
 * User: aleksandarro
 * Date: 5/17/11
 * Time: 12:21 AM
 * To change this template use File | Settings | File Templates.
 */


function initRenderer(){
  
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( shared.width, shared.height );
  shared.container.appendChild( renderer.domElement );

}

function render() {

  requestAnimationFrame( render );

  if (shared.currentScene.ready) {
    
    shared.currentScene.update();
    renderer.render( scene, switchCamera() );
    shared.container.stats.update();
    
  }
    
}

function switchCamera() {
  switch (shared.currentCamera) {
  case 0: return shared.mainCamera; break;
  case 1: return shared.ballCamera; break;
  default: return shared.freeCamera; break;
  }
}