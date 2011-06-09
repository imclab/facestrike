/**
 * Created by .
 * User: kecho
 * Date: 5/20/11
 * Time: 6:38 PM
 */

//this javascript file contains simulation code for pins and ball

FaceStrike = {
   BowlingSimulation : {
      Simulation : function (environmentState, ballState, pinsStates) {
         this.mBallPhysics = new FaceStrike.Physics.BallPhysics(environmentState, ballState);
         this.mEnvironmentState = environmentState;
         //TODO pins physics
         this.mPinsStates = pinsStates;
      }
   },

   Physics : {
      FLOOR : 0,
      EPSILON : 0.05,
      BallPhysics : function (environmentState, ballState) {
         
         this.mBallState = ballState;
         this.mEnvironmentState = environmentState;        
         this.mPreviousInstantForces = {x:0, y:0, z:0};
         this.mFrictionMagnitude = 0;
         this.updateSpinAndVelocityDirections();         
         
         
         
      },

      BallState : function (positionVector, rotationVector, forceVector, angularVelocityVector, radius, mass, elasticity) {
         this.radius = radius;        
         this.position = positionVector;         
         this.deltaVelocity =  {x:0,y:0,z:0};
         this.deltaRotation =  angularVelocityVector;
         this.force = forceVector;
         this.ballMass = mass;
         this.I = 2/5 * this.ballMass * this.radius * this.radius;//moment of inertia of a sphere
         this.rDI = this.radius / this.I;
         this.ballElasticity = elasticity;
         this.mBallRotationMatrix = mat4.create();
         this.updateRotationMatrix(rotationVector);
         mat4.identity(this.mBallRotationMatrix);         
      },
      
      PinState : function (positionVector) {
         this.position = positionVector;
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
   },
   
   getPinsStates : function () {
      //later this array should be 'wrapped' into a pin physics object
      return this.mPinsStates;
   }
}

FaceStrike.Physics.BallPhysics.prototype = {

   update : function () {
      
      this.updateSpinAndVelocityDirections();
      this.updateFrictionForces();
      this.updateRotationalVelocityDeltas();
      this.updateVelocityDeltas();
      this.updatePosition();      
      this.updateRotation();
      this.updateCollisionDetectionEnvironment();      
      
   },
   
   updateSpinAndVelocityDirections : function () {
      this.mSpinDirection = {x: this.mBallState.deltaRotation.x, y:this.mBallState.deltaRotation.y, z: this.mBallState.deltaRotation.z};
      this.mVelocityDirection = {x: this.mBallState.deltaVelocity.x, y:this.mBallState.deltaVelocity.y, z: this.mBallState.deltaVelocity.z};         
      normalizeVector(this.mSpinDirection);
      normalizeVector(this.mVelocityDirection);
   },

   updateVelocityDeltas : function () {
      
      this.mBallState.deltaVelocity.y = clampEpsilon(this.mBallState.deltaVelocity.y -this.mEnvironmentState.gravity + (this.mBallState.force.y/this.mBallState.ballMass));
      this.mBallState.deltaVelocity.x = clampEpsilon(this.mBallState.deltaVelocity.x + (this.mBallState.force.x/this.mBallState.ballMass));
      this.mBallState.deltaVelocity.z = clampEpsilon(this.mBallState.deltaVelocity.z + (this.mBallState.force.z/this.mBallState.ballMass));

      if (Math.abs(this.mBallState.force.x) > 0) {
         this.mPreviousInstantForces.x = this.mBallState.force.x;
      }
      
      if (Math.abs(this.mBallState.force.y) > 0) {
         this.mPreviousInstantForces.y = this.mBallState.force.y;
      }
      
      if (Math.abs(this.mBallState.force.z) > 0) {
         this.mPreviousInstantForces.z = this.mBallState.force.z;
      }
      
   },
   
   updateRotationalVelocityDeltas : function () {
      if (this.ballIsHittingFloor())
      {
         var direction = {x: this.mBallState.deltaVelocity.x, y:0, z: this.mBallState.deltaVelocity.z};
         normalizeVector(direction);
         //rotation into z axis, towards pins
         var xSpin = Math.abs(clampEpsilon((this.mBallState.deltaRotation.x)* this.mBallState.radius));
         if (xSpin > Math.abs(this.mBallState.deltaVelocity.z))
         {            
            //overspin, energy is transfered to translation
            var rawRotation = this.mSpinDirection.x * this.mFrictionMagnitude * this.mBallState.rDI;     
            this.mBallState.deltaRotation.x -= rawRotation;
            //gets multiplied times two since it has to overcome the translation friction
            this.mBallState.force.z +=  2*this.mFrictionMagnitude*this.mSpinDirection.x;
         }
         else if (xSpin < Math.abs(this.mBallState.deltaVelocity.z))
         {
           //underspin, energy is transfered to rotation
           var rawRotation = this.mVelocityDirection.z * this.mFrictionMagnitude * this.mBallState.rDI;                   
           this.mBallState.deltaRotation.x += rawRotation;
           this.mBallState.force.z -=  2*this.mFrictionMagnitude*this.mVelocityDirection.z;
         }
         
         //rotation into z axis, side to side
         var zSpin = Math.abs(clampEpsilon((this.mBallState.deltaRotation.z)* this.mBallState.radius));
         if (zSpin > Math.abs(this.mBallState.deltaVelocity.x))
         {            
            var rawRotation = this.mSpinDirection.z * this.mFrictionMagnitude * this.mBallState.rDI;     
            this.mBallState.deltaRotation.z -= rawRotation;
            this.mBallState.force.x +=  2*this.mFrictionMagnitude*this.mSpinDirection.z;
         }
         else if (zSpin < Math.abs(this.mBallState.deltaVelocity.x))
         {
           var rawRotation = this.mVelocityDirection.x * this.mFrictionMagnitude * this.mBallState.rDI;                   
           this.mBallState.deltaRotation.z += rawRotation;
           this.mBallState.force.x -=  2*this.mFrictionMagnitude*this.mVelocityDirection.x;           
         }

      }
   },
   
   updatePosition : function () {
      this.mBallState.position.x += this.mBallState.deltaVelocity.x;
      this.mBallState.position.y += this.mBallState.deltaVelocity.y;
      this.mBallState.position.z += this.mBallState.deltaVelocity.z;
   },
   
   updateRotation : function () {
      
      //the new coordinates present loss of floating point precission... is there a better way to translate these coordinates?
      this.mBallState.updateRotationMatrix(this.mBallState.deltaRotation);
   },
   
   updateCollisionDetectionEnvironment : function () {
      //detect if the floor is hit
      if (this.ballIsHittingFloor())
      {
         this.mBallState.position.y = this.mBallState.radius;
         this.mBallState.deltaVelocity.y = 0;
         this.mBallState.force.y = clampEpsilon( Math.abs(this.mPreviousInstantForces.y) * this.mBallState.ballElasticity );
         
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
      
      if (this.ballIsHittingFloor())
      {
         this.mFrictionMagnitude = this.mBallState.ballMass * this.mEnvironmentState.gravity * this.mEnvironmentState.groundFriction;
         this.mBallState.force.x -= (this.mFrictionMagnitude*this.mVelocityDirection.x);
         this.mBallState.force.z -= (this.mFrictionMagnitude*this.mVelocityDirection.z);  
      }
      else
      {
         this.mFrictionMagnitude = 0;
      }
      
      
   },
      
   ballIsHittingFloor : function ()  {
      return ((this.mBallState.position.y - this.mBallState.radius) <= FaceStrike.Physics.FLOOR);
   }  
}

FaceStrike.Physics.BallState.prototype = {
   updateRotationMatrix : function (vector) {      
      var rotVector = {x:vector.x,y:vector.y,z:vector.z};
      var magnitude = normalizeVector(rotVector);
      mat4.rotate(this.mBallRotationMatrix,magnitude,[-rotVector.x,rotVector.y,rotVector.z]);
   }
}

//TODO: provisional function that normalizes a vector, replace with respective THREE function??
//it is always better to let the simulation know nothing about the library that renders... we could stick to THREE.js's matrix functions only
function normalizeVector (vector)
{
   var len = Math.sqrt(vector.x*vector.x + vector.y*vector.y + vector.z*vector.z);
   if (len == 0) 
   {
      return 0;
   }
   else
   {
      vector.x /= len;
      vector.y /= len;
      vector.z /= len;
   }
   return len;
}

//TODO: add this function to FaceStrike.utils namespace
function clampEpsilon (val)
{
   return Math.abs(val) < FaceStrike.Physics.EPSILON ? 0 : val;
}

