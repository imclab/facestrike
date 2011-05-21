/**
 * Created by .
 * User: kecho
 * Date: 5/20/11
 * Time: 6:38 PM
 */

//this javascript file contains simulation code for pins and ball

FaceStrike = {
   BowlingSimulation : {
      Simulation : function (environmentState, ballState) {
         this.mBallPhysics = new FaceStrike.Physics.BallPhysics(environmentState, ballState);
         this.mEnvironmentState = environmentState;
         //TODO pins physics
      }
   },
   
   Physics : {
      FLOOR : 0,
      EPSILON : 0.5,
      BallPhysics : function (environmentState, ballState) {
         
         this.mBallState = ballState;
         this.mEnvironmentState = environmentState;        
         this.mPreviousInstantForces = {x:0, y:0, z:0};
      },
      
      BallState : function (positionVector, forceVector, radius, mass, elasticity) {
         this.radius = radius;
         this.position = positionVector;
         this.deltaVelocity = {x:0,y:0,z:0};
         this.force = forceVector;
         this.ballMass = mass;
         this.ballElasticity = elasticity;
      },
      
      EnvironmentState : function (gravityAcceleration, groundFriction) {
         this.gravity = gravityAcceleration;
         this.groundFriction = groundFriction;
      }
      
   }
}

FaceStrike.BowlingSimulation.Simulation.prototype = {
   update : function () {
      this.mBallPhysics.update(); //update ball position
   },
   
   getBallState : function () {
      return this.mBallPhysics.mBallState;
   }
}



FaceStrike.Physics.BallPhysics.prototype = {
   update : function () {
      this.updateFrictionForces();
      this.updateVelocityDeltas();      
      this.updatePosition();      
      this.updateCollisionDetectionEnvironment();
      
      
   },
   
   updateVelocityDeltas : function () {
      
      this.mBallState.deltaVelocity.y = clampEpsilon(this.mBallState.deltaVelocity.y -this.mEnvironmentState.gravity + (this.mBallState.force.y/this.mBallState.ballMass));
      this.mBallState.deltaVelocity.x = clampEpsilon(this.mBallState.deltaVelocity.x + (this.mBallState.force.x/this.mBallState.ballMass));
      this.mBallState.deltaVelocity.z = clampEpsilon(this.mBallState.deltaVelocity.z + (this.mBallState.force.z/this.mBallState.ballMass));
      
      if (this.mBallState.force.x > 0) {
         this.mPreviousInstantForces.x = this.mBallState.force.x;
      }
      
      if (this.mBallState.force.y > 0) {
         this.mPreviousInstantForces.y = this.mBallState.force.y;
      }
      
      if (this.mBallState.force.z > 0) {
         this.mPreviousInstantForces.z = this.mBallState.force.z;
      }
      
   },
   
   updatePosition : function () {
      this.mBallState.position.x += this.mBallState.deltaVelocity.x;
      this.mBallState.position.y += this.mBallState.deltaVelocity.y;
      this.mBallState.position.z += this.mBallState.deltaVelocity.z;
   },
   
   updateCollisionDetectionEnvironment : function () {
      //detect if the floor is hit
      if (this.ballIsHittingFloor())
      {
         this.mBallState.position.y = this.mBallState.radius;
         this.mBallState.deltaVelocity.y = 0;
         this.mBallState.force.y = clampEpsilon( this.mPreviousInstantForces.y * this.mBallState.ballElasticity );
         
      }
      else
      {
         this.mBallState.force.y = 0;
      }
      
      //clear forces
      this.mBallState.force.x = 0;      
      this.mBallState.force.z = 0;
   },
   
   updateFrictionForces : function ()
   {
      //friction only exists if an object is moving, and points to the opposite direction
      //of the current movement
      var direction = {x: this.mBallState.deltaVelocity.x, y:0, z: this.mBallState.deltaVelocity.z};
      
      normalizeVector(direction);
      
      if (this.ballIsHittingFloor())
      {
         var frictionMagnitude = -this.mBallState.ballMass * this.mEnvironmentState.gravity * this.mEnvironmentState.groundFriction;
         this.mBallState.force.x += (frictionMagnitude*direction.x);
         this.mBallState.force.z += (frictionMagnitude*direction.z);        
         
      }      
   },
   
   ballIsHittingFloor : function ()
   {
      return ((this.mBallState.position.y - this.mBallState.radius) <= FaceStrike.Physics.FLOOR);
   },  
}

//TODO: provisional function that normalizes a vector, replace with respective THREE function??
//it is always better to let the simulation know nothing about the library that renders... we could stick to THREE.js's matrix functions only
function normalizeVector (vector)
{
   var len = Math.sqrt(vector.x*vector.x + vector.y*vector.y + vector.z*vector.z);
   if (len == 0) 
   {
      return;
   }
   else
   {
      vector.x /= len;
      vector.y /= len;
      vector.z /= len;
   }
   return vector;
}

//TODO: add this function to FaceStrike.utils namespace
function clampEpsilon (val)
{
   return Math.abs(val) < FaceStrike.Physics.EPSILON ? 0 : val;
}
