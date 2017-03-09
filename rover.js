/*
Develop an api that moves a rover around on a grid.
You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
The rover receives a character array of commands.
Implement commands that move the rover forward/backward (f,b).
Implement commands that turn the rover left/right (l,r).
Implement wrapping from one edge of the grid to another. (planets are spheres after all)
Implement obstacle detection. The rover should execute the given commands until it reaches an obstacle, then stop at the last possible position and report the obstacle.
*/

 var myRover = {
  position: [0,0],
  newPosition:[0,0], 
  direction: 'North',
  status: 'doing great',
  command: undefined
};

var obstacle = {
    obstaclePosition : [Math.floor((Math.random() * 9)+1), Math.floor((Math.random() * 10))]
};


function verify(command) {
  var command = document.getElementById("instr").value;  
  if (command === undefined || command === "") {
    document.getElementById("output").innerHTML = "No command introduced:  Mars rover shutting down...";
    return false;
  }
  else {
    for (var i = 0; i < command.length; i++) {
      if (command[i] != "f" && command[i] != "b" && command[i] != "l" && command[i] != "r") {
        return confirm("Please use only the following letters: 'f b l r'.");
      }
    }
  return true;
  }
}

function inputText() {
  var moves = document.getElementById("instr").value;  
  if (!verify(moves)) {
    return false;
  }
  else {
    myRover.command = moves;
  }
  for (var i = 0; i < moves.length; i++) {
    var move = moves[i];
    if (move === "f" || move === "b") { 
        if (!doMove(move)) {
          break;
        }
    } 
    else if (move === 'l' || move === 'r') {
          doTurn(move);
        }
  }
  document.getElementById("output").innerHTML = "Rover's position: X = " + myRover.position[0] + ", Y = " + myRover.position[1] + "; facing " + myRover.direction + "; status: " + myRover.status + ";<br> obstacle's position: X = " + obstacle.obstaclePosition[0] + ", Y = " + obstacle.obstaclePosition[1] + ".";
  return true;
}
  

function doMove(move) {
  var stepX = 0;
  var stepY = 0;
  switch(myRover.direction) {
    case 'North':
      myRover.newPosition[0]++
      break;
    case 'East':
      myRover.newPosition[1]++
      break;
     case 'South':
     myRover.newPposition[0]--
      break;
     case 'West':
       myRover.newPosition[1]--
       break;
   };
    // MOVING BACKWARDS
    if (move === 'b') { 
      stepX *= -1;
      stepY *= -1;
    }
    if (myRover.position[0] === 9 && stepX === 1) {
      myRover.newPosition[0] = 0;
    }
    else if (myRover.position[0] === 0 && stepX === -1) {
      myRover.newPosition[0] = 9;
    }
    else {
      myRover.newPosition[0] += stepX;
    }
    if (myRover.position[1] === 9 && stepY === 1) {
      myRover.newPosition[1] = 0;
    }
    else if (myRover.position[1] === 0 && stepY === -1) {
      myRover.newPosition[1] = 9;
    }
    else {
      myRover.newPosition[1] += stepY;
    }
    if (thereIsAnObstacle(myRover.newPosition)) {
      return false;
    }
    else {
      myRover.position[0] = myRover.newPosition[0];
      myRover.position[1] = myRover.newPosition[1];
      return true;
    }
}

function doTurn(move){
  // TURN LEFT
    if (move === 'l') {
      // North --> West
      if (myRover.direction === 'North') { 
        myRover.direction = 'West';
      }
      // South --> East
      else if (myRover.direction === 'South') { 
        myRover.direction = 'East';
      }
      // East --> North
      else if (myRover.direction === 'East') { 
        myRover.direction = 'North';
      }
      // West --> South
      else if (myRover.direction === 'West') { 
        myRover.direction = 'South';
      }
    } 
    // TURN RIGHT
    else if (move === 'r') {
      // North --> East
      if (myRover.direction === 'North') { 
        myRover.direction = 'East';
      }
      // South --> West
      else if (myRover.direction === 'South') { 
        myRover.direction = 'West';
      }
      // East --> South
      else if (myRover.direction === 'East') {
        myRover.direction = 'South';
      }
      // West --> North
      else if (myRover.direction === 'West') {    
        myRover.direction = 'North';
      }  
    }
}

function thereIsAnObstacle(tempPosition) {
  if ((obstacle.obstaclePosition[0] === myRover.newPosition[0]) && (obstacle.obstaclePosition[1] === myRover.newPosition[1])){
    myRover.status = '#$@&%*! aka obstructed';
    return true;
  }
  return false;
} 