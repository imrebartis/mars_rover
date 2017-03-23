/*
Develop an api that moves a rover around on a grid.
You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
1. Create an object to represent the rover that has position and direction attributes.
2. Create a grid using arrays.
3. Write functions for the various commands: forward/backward (f,b), left/right (l,r).
4. Try to call some of those functions and display the new position of the rover.
Implement wrapping from one edge of the grid to another. (planets are spheres after all)
Implement obstacle detection. The rover should execute the given commands until it reaches an obstacle, then stop at the last possible position and report the obstacle.
*/

 var myRover1 = {
  position: [0,0],
  newPosition:[0,0], 
  direction: 'North',
  status: 'doing great',
  command: undefined
};

 var myRover2 = {
  position2: [9,9],
  newPosition2: [9,9], 
  direction2: 'North',
  status2: 'doing great',
  command2: undefined
};

var obstacle = {
    obstaclePosition : [Math.floor((Math.random() * 8)+2), Math.floor((Math.random() * 8)+2)]
};

// var map = {
//   grid: array2D(10,10,0)
// };

// function array2D(numrows, numcols, initial){
//    var arr = [];
//    for (var i = 0; i < numrows; ++i){
//       var columns = [];
//       for (var x = 0; x < numcols; ++x){
//          columns[x] = "["+i+","+x+"]";
//       }
//       arr[i] = columns;
//     }
//     return arr;
// }

// function mapIni(){
//   map.grid[obstacle.obstaclePosition[0]][obstacle.obstaclePosition[1]]= "Obstacle";
//   map.grid[myRover1.position[0]][myRover1.position[1]]= "Rover one";
//   map.rover = '[0,0]';
//   map.roverNew = '[0,0]';
//   map.roverP0 = 0;
//   map.roverP1 = 0;
//   map.roverP0New = 0;
//   map.roverP1New = 0;
//   map.grid[myRover2.position2[0]][myRover2.position2[1]]= "Rover two";
//   map.rover2 = '[0,0]';
//   map.rover2New= '[0,0]';
//   map.rover2P0 = 0;
//   map.rover2P1 = 0;
//   map.rover2P0New = 0;
//   map.rover2P1New = 0;
// }
// function refreshGrid(){
//   map.grid[map.roverP0][map.roverP1]= map.rover;
//   map.grid[map.roverP0New][map.roverP1New]= "Rover one";
//   map.rover = map.roverNew;
//   map.roverP1 = map.roverP1New;
//   map.roverP0 = map.roverP0New;
//   map.grid[map.rover2P0][map.rover2P1]= map.rover2;
//   map.grid[map.rover2P0New][map.rover2P1New]= "Rover two";
//   map.rover2 = map.rover2New;
//   map.rover2P1 = map.rover2P1New;
//   map.rover2P0 = map.rover2P0New;
// }

function verifyOne(command) {
  var command = document.getElementById("instr1").value;
  if (command === undefined || command === "") {
    return confirm("Please give commands to both rovers!");
  }
  else {
    command = command.toLowerCase();
    for (var i = 0; i < command.length; i++) {
      if (command[i] != "f" && command[i] != "b" && command[i] != "l" && command[i] != "r") {
        return confirm("Please use only the following letters: 'f b l r'.");
      }
    }
  return true;
  }
}

function verifyTwo(command2) {
  var command2 = document.getElementById("instr2").value;
  if (command2 === undefined || command2 === "") {
    return confirm("Please give commands to both rovers!");
  }
  else {
    command2 = command2.toLowerCase();
    for (var i = 0; i < command2.length; i++) {
      if (command2[i] != "f" && command2[i] != "b" && command2[i] != "l" && command2[i] != "r") {
        return confirm("Please use only the following letters: 'f b l r'.");
      }
    }
  return true;
  }
}

function inputText() {
  var moves = document.getElementById("instr1").value;
  moves = moves.toLowerCase();
  var movesTwo = document.getElementById("instr2").value;
  movesTwo = movesTwo.toLowerCase();

  if (!verifyOne(moves)) {
    return false;
  }
  else if (!verifyTwo(moves)) {
    return false;
  }
  else {
    myRover1.command = moves;
    myRover2.command2 = movesTwo;
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
  //document.getElementById("output").innerHTML = "Rover's position: X = " + myRover1.position[0] + ", Y = " + myRover1.position[1] + "; facing " + myRover1.direction + "; status: " + myRover1.status + ";<br> obstacle's position: X = " + obstacle.obstaclePosition[0] + ", Y = " + obstacle.obstaclePosition[1] + ".";
  // console.log("Final position for rover one: [" + myRover1.position[0] + ", " + myRover1.position[1] + "], status: "+myRover1.status + "\n Final position for rover two: [" + myRover2.position2[0] + "," + myRover2.position2[1] + "], status: "+myRover2.status2);
  // refreshGrid();
  // console.log("Updated map:\n"+ map.grid);

  for (var i = 0; i < movesTwo.length; i++) {
    var moveTwo = movesTwo[i];
    if (moveTwo === "f" || moveTwo === "b") { 
        if (!doMoveTwo(moveTwo)) {
          break;
        }
    } 
    else if (moveTwo === 'l' || moveTwo === 'r') {
          doTurnTwo(moveTwo);
        }
  }
  document.getElementById("output").innerHTML = "Rover one's position: X = " + myRover1.position[0] + ", Y = " + myRover1.position[1] + "; facing " + myRover1.direction + "; status: " + myRover1.status + ".<br> Rover two's position: X = " + myRover2.position2[0] + ", Y = " + myRover2.position2[1] + "; facing " + myRover2.direction2 + "; status: " + myRover2.status2 + ".<br> Obstacle's position: X = " + obstacle.obstaclePosition[0] + ", Y = " + obstacle.obstaclePosition[1] + ".";
  
  return true;
}
  

function doMove(move) {
  var stepX = 0;
  var stepY = 0;
  // north
 if (myRover1.direction === 'North') { 
 stepX = 1;
 }
  // south
  else if (myRover1.direction === 'South') { 
  stepX = -1;
  }
   // east
   else if (myRover1.direction === 'East') { 
     stepY = 1;
   }
   // west
   else if (myRover1.direction === 'West') {
      stepY = -1;
   }
    // MOVING BACKWARDS
    if (move === 'b') { 
      stepX *= -1;
      stepY *= -1;
    }
    if (myRover1.position[0] === 9 && stepX === 1) {
      myRover1.newPosition[0] = 0;
    }
    else if (myRover1.position[0] === 0 && stepX === -1) {
      myRover1.newPosition[0] = 9;
    }
    else {
      myRover1.newPosition[0] += stepX;
    }
    if (myRover1.position[1] === 9 && stepY === 1) {
      myRover1.newPosition[1] = 0;
    }
    else if (myRover1.position[1] === 0 && stepY === -1) {
      myRover1.newPosition[1] = 9;
    }
    else {
      myRover1.newPosition[1] += stepY;
    }
    if (thereIsAnObstacleForRoverOne(myRover1.newPosition) || (roversCollide(myRover1.newPosition))) {
      return false;
    }
    else {
      myRover1.position[0] = myRover1.newPosition[0];
      myRover1.position[1] = myRover1.newPosition[1];
      // map.roverP0New = myRover1.position[0];
      // map.roverP1New = myRover1.position[1];
      return true;
    }
}

function doMoveTwo(moveTwo) {
  var stepX2 = 0;
  var stepY2 = 0;
  // north
 if (myRover2.direction2 === 'North') { 
  stepX2 = 1;
 }
  // south
  else if (myRover2.direction2 === 'South') { 
  stepX2 = -1;
  }
   // east
   else if (myRover2.direction2 === 'East') { 
     stepY2 = 1;
   }
   // west
   else if (myRover2.direction2 === 'West') {
      stepY2 = -1;
   }
    // MOVING BACKWARDS
    if (moveTwo === 'b') { 
      stepX2 *= -1;
      stepY2 *= -1;
    }
    if (myRover2.position2[0] === 9 && stepX2 === 1) {
      myRover2.newPosition2[0] = 0;
    }
    else if (myRover2.position2[0] === 0 && stepX2 === -1) {
      myRover2.newPosition2[0] = 9;
    }
    else {
      myRover2.newPosition2[0] += stepX2;
    }
    if (myRover2.position2[1] === 9 && stepY2 === 1) {
      myRover2.newPosition2[1] = 0;
    }
    else if (myRover2.position2[1] === 0 && stepY2 === -1) {
      myRover2.newPosition2[1] = 9;
    }
    else {
      myRover2.newPosition2[1] += stepY2;
    }
    if (thereIsAnObstacleForRoverTwo(myRover2.newPosition2) || roversCollide(myRover2.newPosition2)) {
      return false;
    }
    else {
      myRover2.position2[0] = myRover2.newPosition2[0];
      myRover2.position2[1] = myRover2.newPosition2[1];
      // map.rover2P0New = myRover2.position2[0];
      // map.rover2P1New = myRover2.position2[1];
      return true;
    }
}
function doTurn(move){
  // TURN LEFT

    if (move === 'l') {
      // North --> West
      if (myRover1.direction === 'North') { 
        myRover1.direction = 'West';
      }
      // South --> East
      else if (myRover1.direction === 'South') { 
        myRover1.direction = 'East';
      }
      // East --> North
      else if (myRover1.direction === 'East') { 
        myRover1.direction = 'North';
      }
      // West --> South
      else if (myRover1.direction === 'West') { 
        myRover1.direction = 'South';
      }
    } 
    // TURN RIGHT
    else if (move === 'r') {
      // North --> East
      if (myRover1.direction === 'North') { 
        myRover1.direction = 'East';
      }
      // South --> West
      else if (myRover1.direction === 'South') { 
        myRover1.direction = 'West';
      }
      // East --> South
      else if (myRover1.direction === 'East') {
        myRover1.direction = 'South';
      }
      // West --> North
      else if (myRover1.direction === 'West') {    
        myRover1.direction = 'North';
      }  
    }
}

function doTurnTwo(moveTwo){
  // TURN LEFT

    if (moveTwo === 'l') {
      // North --> West
      if (myRover2.direction2 === 'North') { 
        myRover2.direction2 = 'West';
      }
      // South --> East
      else if (myRover2.direction2 === 'South') { 
        myRover2.direction2 = 'East';
      }
      // East --> North
      else if (myRover2.direction2 === 'East') { 
        myRover2.direction2 = 'North';
      }
      // West --> South
      else if (myRover2.direction2 === 'West') { 
        myRover2.direction2 = 'South';
      }
    } 
    // TURN RIGHT
    else if (moveTwo === 'r') {
      // North --> East
      if (myRover2.direction2 === 'North') { 
        myRover2.direction2 = 'East';
      }
      // South --> West
      else if (myRover2.direction2 === 'South') { 
        myRover2.direction2 = 'West';
      }
      // East --> South
      else if (myRover2.direction2 === 'East') {
        myRover2.direction2 = 'South';
      }
      // West --> North
      else if (myRover2.direction2 === 'West') {    
        myRover2.direction2 = 'North';
      }  
    }
}

function thereIsAnObstacleForRoverOne(newPosition) {
  if (obstacle.obstaclePosition[0] === myRover1.newPosition[0] && obstacle.obstaclePosition[1] === myRover1.newPosition[1]){
    myRover1.status = '#$@&%*! aka obstructed';
    return true;
  }
  return false;
} 

function thereIsAnObstacleForRoverTwo(newPosition2) {
  if (obstacle.obstaclePosition[0] === myRover2.newPosition2[0] && obstacle.obstaclePosition[1] === myRover2.newPosition2[1]){
    myRover2.status2 = '#$@&%*! aka obstructed';
    return true;
    }
  return false;
  }

function roversCollide(newPosition) {
  if ((myRover1.newPosition[0] === myRover2.newPosition2[0] && myRover1.newPosition[1] === myRover2.newPosition2[1])){
    myRover1.status = 'obstructed by rover number two';
    myRover2.status2 = ' obstructed by rover number one';

    return true;
  }
  return false;
} 
// mapIni();
// console.log("Initial grid map:\n"+ map.grid);