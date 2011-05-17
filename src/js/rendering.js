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
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

}

function render() {

  alley.rotation.y += ( targetRotation - lane.rotation.y ) * 0.05;
  renderer.render( scene, camera );

}