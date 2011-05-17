/**
 * Created by .
 * User: aleksandarro
 * Date: 5/17/11
 * Time: 12:12 AM
 * To change this template use File | Settings | File Templates.
 */

var alley;
var lane, laneMaterial;
var ball, ballMaterial;
var pin = [];
var pinMaterial;
var light = [];

function SandboxScene() {

  this.id = 'sandbox';

  camera = new THREE.Camera( 35, window.innerWidth / window.innerHeight, 10, 10000 );
  camera.position.y = 100;
  camera.position.z = -1200;

  scene = new THREE.Scene();

  alley = new THREE.Object3D();
  scene.addObject( alley );

  // Lane
  laneMaterial = new THREE.MeshLambertMaterial( {map: THREE.ImageUtils.loadTexture("assets/textures/lane.jpg"), color: 0xffffff, lights: true } );
  lane = new THREE.Mesh( new THREE.Plane( 99, 1800 ), laneMaterial );
  lane.rotation.x = - 90 * ( Math.PI / 180 );
  alley.addChild( lane );

  // Ball
  ballMaterial = new THREE.MeshLambertMaterial( { color: 0x333333, lights: true } );
  ball = new THREE.Mesh( model[1].geometry, ballMaterial );
  ball.position.y = 15;
  ball.position.z = -900;
  ball.rotation.x = - 140 * ( Math.PI / 180 );
  alley.addChild( ball );

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
    alley.addChild( pin[i] );

  }

  // Lights
  light[0] = new THREE.AmbientLight( 0x608090 );
  light[1] = new THREE.DirectionalLight( 0xffcc99, 0.9 );
  light[1].position.set( 0, 2, -1.5 );
  scene.addLight( light[0] );
  scene.addLight( light[1] );

}

SandboxScene.prototype.update = function(){

  alley.rotation.y = shared.mouse.x/1000;

};