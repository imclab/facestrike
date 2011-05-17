/**
 * Created by .
 * User: aleksandarro
 * Date: 5/17/11
 * Time: 12:21 AM
 * To change this template use File | Settings | File Templates.
 */

var camera = new THREE.Camera();
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

function initRenderer(){

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( shared.width, shared.height );
  container.appendChild( renderer.domElement );

}

function render() {

  shared.currentScene.update();
  renderer.render( scene, camera );
  requestAnimationFrame( render );
  stats.update();

}