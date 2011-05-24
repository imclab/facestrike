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
var simulation;

function SandboxScene() {

  this.id = 'sandbox';
  
  shared.mainCamera.position.y = 100;
  shared.mainCamera.position.z = -1200;
  
  scene = new THREE.Scene();

  // Lane
  laneMaterial = new THREE.MeshLambertMaterial( {map: THREE.ImageUtils.loadTexture("assets/textures/lane.jpg"), color: 0xffffff, lights: true } );
  lane = new THREE.Mesh( new THREE.Plane( 99, 1800 ), laneMaterial );
  lane.rotation.x = - 90 * ( Math.PI / 180 );
  scene.addChild( lane );

  // Ball
  ballMaterial = new THREE.MeshLambertMaterial( { color: 0x333333, lights: true } );
  ball = new THREE.Mesh( model[1].geometry, ballMaterial );
  
  scene.addChild( ball );

  // Pins
  var pin_positions = [];
  pin_positions.push( new THREE.Vector3(0,FaceStrike.Physics.FLOOR,800) );
  pin_positions.push( new THREE.Vector3(15.25,FaceStrike.Physics.FLOOR,830.5) );
  pin_positions.push( new THREE.Vector3(-15.25,FaceStrike.Physics.FLOOR,830.5) );
  pin_positions.push( new THREE.Vector3(30.5,FaceStrike.Physics.FLOOR,861) );
  pin_positions.push( new THREE.Vector3(0,FaceStrike.Physics.FLOOR,861) );
  pin_positions.push( new THREE.Vector3(-30.5,FaceStrike.Physics.FLOOR,861) );
  pin_positions.push( new THREE.Vector3(42.75,FaceStrike.Physics.FLOOR,891.5) );
  pin_positions.push( new THREE.Vector3(12.25,FaceStrike.Physics.FLOOR,891.5) );
  pin_positions.push( new THREE.Vector3(-12.25,FaceStrike.Physics.FLOOR,891.5) );
  pin_positions.push( new THREE.Vector3(-42.75,FaceStrike.Physics.FLOOR,891.5) );

  pinMaterial = new THREE.MeshLambertMaterial( {map: THREE.ImageUtils.loadTexture("assets/textures/pin.jpg"),  color: 0xffffff, lights: true } );

  for (var i = 0; i<pin_positions.length; i++){

    pin[i] = new THREE.Mesh( model[0].geometry, pinMaterial );
    pin[i].position = pin_positions[i];
    pin[i].position.x += Math.random(1)*0.2;
    pin[i].position.z += Math.random(2)*0.2;
    scene.addChild( pin[i] );

  }

  // Lights
  light[0] = new THREE.AmbientLight( 0x608090 );
  light[1] = new THREE.DirectionalLight( 0xffcc99, 0.9 );
  light[1].position.set( 0, 2, -1.5 );
  scene.addLight( light[0] );
  scene.addLight( light[1] );
  
  var ballState = new FaceStrike.Physics.BallState ({x: 0, y:(FaceStrike.Physics.FLOOR + 15), z:-900},{x:-Math.PI/2,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}, 15, 50, 0.7);
  var environmentState = new FaceStrike.Physics.EnvironmentState(3, 0.03);
  simulation = new FaceStrike.BowlingSimulation.Simulation(environmentState, ballState);

  this.ready = true;

}

SandboxScene.prototype = {
  
  update : function() {
   this.updateModels();
   simulation.update();
   
  },
  
  //function updates the state of rendered objects
  updateModels : function () {
    //updating balls' position 
    var ballState = simulation.getBallState();
    ball.position.x =  ballState.position.x;
    ball.position.y =  ballState.position.y;
    ball.position.z =  ballState.position.z;  
   
    //updating balls' rotation
    var r = ballState.mBallRotationMatrix;
    ball.rotation.setRotationFromMatrix(new THREE.Matrix4(r[0],r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8],r[9],r[10],r[11],r[13],r[14],r[15]));
    
    shared.ballCamera.position.x = ball.position.x;
    shared.ballCamera.position.y = ball.position.y + 20;
    shared.ballCamera.position.z = ball.position.z - 60;
  }
  
}