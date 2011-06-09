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
  var pinStates = [];
  pinStates.push (new FaceStrike.Physics.PinState({x:0,y:FaceStrike.Physics.FLOOR,z:800}));
  pinStates.push (new FaceStrike.Physics.PinState({x:15.25,y:FaceStrike.Physics.FLOOR,z:830.5}));
  pinStates.push (new FaceStrike.Physics.PinState({x:-15.25,y:FaceStrike.Physics.FLOOR,z:830.5}));
  pinStates.push (new FaceStrike.Physics.PinState({x:30.5,y:FaceStrike.Physics.FLOOR,z:861}));
  pinStates.push (new FaceStrike.Physics.PinState({x:0,y:FaceStrike.Physics.FLOOR,z:861}));
  pinStates.push (new FaceStrike.Physics.PinState({x:-30.5,y:FaceStrike.Physics.FLOOR,z:861}));
  pinStates.push (new FaceStrike.Physics.PinState({x:42.75,y:FaceStrike.Physics.FLOOR,z:891.5}));
  pinStates.push (new FaceStrike.Physics.PinState({x:12.25,y:FaceStrike.Physics.FLOOR,z:891.5}));
  pinStates.push (new FaceStrike.Physics.PinState({x:-12.25,y:FaceStrike.Physics.FLOOR,z:891.5}));
  pinStates.push (new FaceStrike.Physics.PinState({x:-42.75,y:FaceStrike.Physics.FLOOR,z:891.5}));

 //creating pins
  pinMaterial = new THREE.MeshLambertMaterial( {map: THREE.ImageUtils.loadTexture("assets/textures/pin.jpg"),  color: 0xffffff, lights: true } );
  for (var i = 0; i<pinStates.length; i++){

    pin[i] = new THREE.Mesh( model[0].geometry, pinMaterial );
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
  simulation = new FaceStrike.BowlingSimulation.Simulation(environmentState, ballState, pinStates);

  StartDebugControlers();
  this.ready = true;

}

SandboxScene.prototype = {
  
  update : function() {
   this.updateModels();
   simulation.update();
   
  },
  
  //function updates the state of rendered objects
  updateModels : function () {
     UpdateDebugControlers();
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
    
    //updating pins position and rotation
    var pinStates = simulation.getPinsStates();
    
    for (var i = 0; i < pinStates.length; ++i)
    {
       
       pin[i].position.x = pinStates[i].position.x;
       pin[i].position.y = pinStates[i].position.y;
       pin[i].position.z = pinStates[i].position.z;
       
    }
  }
  
}

var DebuggingState = {
   "selected" : 0,
   "objects" : [],
   "movingStep" : 3,
   "buttons" : {
      "UP" : false,
      "DOWN" : false,
      "LEFT" : false,
      "RIGHT" : false,
      "YUP" : false,
      "YDOWN" : false,
      "SELECT" : false
   }
};

var ButtonCodes = {
   "UP" : 87,//w
   "DOWN" : 83,//s
   "LEFT" : 65,//a
   "RIGHT" : 68,//d
   "YUP" : 81,//q
   "YDOWN" : 90,//z
   "SELECT" : 67//c
}

function StartDebugControlers()
{
   //declare event listeners
   document.onkeydown = function (event)
   {
      
      switch (event.which)
      {
         case ButtonCodes.UP:
            DebuggingState.buttons.UP = true;
            break;
         case ButtonCodes.DOWN:
            DebuggingState.buttons.DOWN = true;
            break;
         case ButtonCodes.LEFT:
            DebuggingState.buttons.LEFT = true;
            break;
         case ButtonCodes.RIGHT:
            DebuggingState.buttons.RIGHT = true;
            break;
         case ButtonCodes.YUP:
            DebuggingState.buttons.YUP = true;
            break;
         case ButtonCodes.YDOWN:
            DebuggingState.buttons.YDOWN = true;
            break;
         case ButtonCodes.SELECT:
            DebuggingState.buttons.SELECT = true;
            break;
      }
   }
   
   document.onkeyup = function (event)
   {
      switch (event.which)
      {
         case ButtonCodes.UP:
            DebuggingState.buttons.UP = false;
            break;
         case ButtonCodes.DOWN:
            DebuggingState.buttons.DOWN = false;
            break;
         case ButtonCodes.LEFT:
            DebuggingState.buttons.LEFT = false;
            break;
         case ButtonCodes.RIGHT:
            DebuggingState.buttons.RIGHT = false;
            break;
         case ButtonCodes.YUP:
            DebuggingState.buttons.YUP = false;
            break;
         case ButtonCodes.YDOWN:
            DebuggingState.buttons.YDOWN = false;
            break;
         case ButtonCodes.SELECT:
            DebuggingState.buttons.SELECT = false;
            break;
      }
   }
   
   //register objects
   DebuggingState.objects.push(simulation.getBallState());
   var pinStates = simulation.getPinsStates();
   for (var i = 0; i < pinStates.length; ++i)
   {
      DebuggingState.objects.push(pinStates[i]);
   }
}

function UpdateDebugControlers()
{
   
   if (DebuggingState.buttons.UP)
   {
      DebuggingState.objects[DebuggingState.selected].position.z += DebuggingState.movingStep;
   }
   else if (DebuggingState.buttons.DOWN)
   {
      DebuggingState.objects[DebuggingState.selected].position.z -= DebuggingState.movingStep;
   }
   
   if (DebuggingState.buttons.LEFT)
   {
      DebuggingState.objects[DebuggingState.selected].position.x += DebuggingState.movingStep;
   }
   else if (DebuggingState.buttons.RIGHT)
   {
      DebuggingState.objects[DebuggingState.selected].position.x -= DebuggingState.movingStep;
   }
   
   if (DebuggingState.buttons.YUP)
   {
      DebuggingState.objects[DebuggingState.selected].position.y += DebuggingState.movingStep;
   }
   else if (DebuggingState.buttons.YDOWN)
   {
      DebuggingState.objects[DebuggingState.selected].position.y -= DebuggingState.movingStep;
   }
   
   if (DebuggingState.buttons.SELECT)
   {
      DebuggingState.buttons.SELECT = false;
      DebuggingState.selected = (DebuggingState.selected + 1) % DebuggingState.objects.length;
   }
}