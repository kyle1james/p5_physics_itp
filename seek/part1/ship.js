// The "Vehicle" class https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/tree/master/chp06_agents/NOC_6_01_Seek

function Vehicle(x, y){
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    // size
    this.r = 6;
    // ability
    this.maxspeed = 5;
    this.maxforce = 0.5;


  // Method to update location
  this.update = function() {
    // Update velocity
    // velocity alters postion
    // acceleration alters velocity
    this.velocity.add(this.acceleration);
    // Limit speed

    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  this.eat = function(list){
    var record = Infinity;
    var closest = -1;
    for( var i = 0; i < list.length; i++){
      var d = this.position.dist(list[i]);
      if (d < record ){
        record = d;
        closest = i;
      }
    }
    if(record < 5){
      list.splice(closest ,1);
    } else {
    this.seek(list[closest]);
    }
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
  }

  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}
