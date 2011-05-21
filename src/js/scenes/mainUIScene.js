/**
 * Created by .
 * User: aleksandarro
 * Date: 5/17/11
 * Time: 12:12 AM
 * To change this template use File | Settings | File Templates.
 */

var uiRoot;
var pin = [];
var pinMaterial;
var light = [];

function MainUIScene() {

  this.id = 'mainUI';

  shared.mainCamera = new THREE.Camera( 35, window.innerWidth / window.innerHeight, 10, 10000 );
  shared.mainCamera.useTarget = false;
  shared.mainCamera.position.y = 30;
  shared.mainCamera.position.z = 700;
  shared.mainCamera.rotation.y = - 180 * ( Math.PI / 180 );

  scene = new THREE.Scene();

  uiRoot = new THREE.Object3D();
  scene.addObject( uiRoot );

  // Pins
  var pin_positions = [];
  pin_positions.push( new THREE.Vector3(0,0,800) );
  pin_positions.push( new THREE.Vector3(15.25,0,830.5) );
  pin_positions.push( new THREE.Vector3(-15.25,0,830.5) );
  pin_positions.push( new THREE.Vector3(30.5,0,861) );
  pin_positions.push( new THREE.Vector3(0,0,861) );
  pin_positions.push( new THREE.Vector3(-30.5,0,861) );
  pin_positions.push( new THREE.Vector3(42.75,0,891.5) );
  pin_positions.push( new THREE.Vector3(12.25,0,891.5) );
  pin_positions.push( new THREE.Vector3(-12.25,0,891.5) );
  pin_positions.push( new THREE.Vector3(-42.75,0,891.5) );

  pinMaterial = new THREE.MeshLambertMaterial( {map: THREE.ImageUtils.loadTexture("assets/textures/pin.jpg"),  color: 0xffffff, lights: true } );

  for (var i = 0; i<pin_positions.length; i++){

    pin[i] = new THREE.Mesh( model[0].geometry, pinMaterial );
    pin[i].position = pin_positions[i];
    pin[i].position.x += Math.random(1)*0.2;
    pin[i].position.z += Math.random(2)*0.2;
    uiRoot.addChild( pin[i] );

  }

  // Lights
  light[0] = new THREE.AmbientLight( 0x608090 );
  light[1] = new THREE.DirectionalLight( 0xffcc99, 0.5 );
  light[1].position.set( 0, 2, -1.5 );
  light[2] = new THREE.DirectionalLight( 0xff4422, 2.5 );
  light[2].position.set( 0.9, 1, 1.5 );
  light[3] = new THREE.DirectionalLight( 0x7788ff, 0.5 );
  light[3].position.set( -5.9, -1, -3 );
  scene.addLight( light[0] );
  scene.addLight( light[1] );
  scene.addLight( light[2] );
  scene.addLight( light[3] );
  
  this.ready = true;

}

MainUIScene.prototype.update = function(){

};