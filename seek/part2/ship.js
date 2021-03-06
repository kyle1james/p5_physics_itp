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
    this.health = 1;
    // smarty pants
    this.dna = [];
    this.dna[0] = random(-5,5);
    this.dna[1] = random(-5,5);

  // Method to update location
  this.update = function() {
    //every frame health goes down
    this.health -= 0.002
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

  this.behaviors = function(good, bad){
    var steerG = this.eat(good, 0.1);
    var steerB = this.eat(bad, -0.5);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  this.eat = function(list, nutrition){
    var record = Infinity;
    var closest = -1;
    for( var i = 0; i < list.length; i++){
      var d = this.position.dist(list[i]);
      if (d < record ){
        record = d;
        closest = i;
      }
    }
    // moment of eating
    if(record < 5){
      list.splice(closest ,1);
      this.health += nutrition;
    } else if (closest > -1) {
      return this.seek(list[closest]);
    }
    return createVector(0, 0);
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

    return steer;
    //this.applyForce(steer);
  }
  // are you ok, are you ok, are you ok annie?
  this.dead = function(){
    return (this.health < 0);
  }

  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var angle = this.velocity.heading() + PI / 2;

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);

    stroke(0,255,0);
    line(0,0,0, -this.dna[0]*20);
    stroke(255,0,0);
    line(0,0,0, -this.dna[1]*20);

    // Vehicle color to show health
    var gr = color(0,255,0);
    var rd = color(255,0,0);
    // linear interperlation
    // red0 ----------- 1green
    var col = lerpColor(rd,gr,this.health);
    fill(col);
    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);



    pop();
  }
}
