var world = [];
var buffer = [];
var interv;

window.onload = function() {
  var game = document.getElementById("game");
  world = randomWorld(60,90, 0.15);
  draw(world);
}

function start() {
  interv = setInterval(iterate, 80);
}

function draw(w) {
  var text = "";
  for(var x in w) {
    for(var y in w[x]) {
      if(w[x][y] == 1) {
        text += w[x][y];
      } else {
        text += " ";
      }
    }
    text+="<br/>";
    game.innerHTML = text;
  }
}

function randomWorld(sizeX, sizeY, prob) {
  var newWorld = [];
  for(var x=0; x < sizeX; x++) {
    var line = [];
    for(var y=0; y < sizeY; y++) {
      if(Math.random() < prob) {
        line.push(1);
      } else {
        line.push(0);
      }
    }
    newWorld.push(line);
  }
  return newWorld;
}

function createWorld(sizeX, sizeY) {
  var newWorld = [];
  for(var x=0; x < sizeX; x++) {
    var line = [];
    for(var y=0; y < sizeY; y++) {
      line.push("0");
    }
    newWorld.push(line);
  }
  return newWorld;
}

function iterate() {
  var sizeX = world.length;
  var sizeY = world[0].length;
  buffer = createWorld(sizeX, sizeY);
  for(var x=0; x < sizeX; x++) {
    for(var y=0; y < sizeY; y++) {
      var neighbours = countNeighbours(x,y);
      if(world[x][y] == 1) {
        if(neighbours >= 2 & neighbours <= 3) {
          buffer[x][y] = 1;
        } else {
          buffer[x][y] = 0;
        }
      } else {
        if(neighbours == 3) {
          buffer[x][y] = 1;
        } else {
          buffer[x][y] = 0;
        }
      }
    }
  }
  world = buffer;
  game.innerHTML += "<br/>------<br/>";
  draw(world);
}

function countNeighbours(x, y) {
  var neighbours = 0;

  /*   X--
  *    -o-
  *    ---
  */
  if(x > 0 && y > 0 && world[x-1][y-1]==1) {
    neighbours++;
  }
  /*   -X-
  *    -o-
  *    ---
  */
  if(x > 0 && world[x-1][y]==1) {
    neighbours++;
  }
  /*   --X
  *    -o-
  *    ---
  */
  if(x > 0 && y < world[x].length-1 && world[x-1][y+1]==1) {
    neighbours++;
  }
  /*   ---
  *    -oX
  *    ---
  */
  if(y < world[0].length-1 && world[x][y+1]==1) {
    neighbours++;
  }
  /*   ---
  *    -o-
  *    --X
  */
  if(x < world.length-1 && y < world[x].length-1 && world[x+1][y+1]==1) {
    neighbours++;
  }
  /*   ---
  *    -o-
  *    -X-
  */
  if(x < world.length-1 && world[x+1][y]==1) {
    neighbours++;
  }
  /*   ---
  *    -o-
  *    X--
  */
  if(x < world.length-1 && y > 0  &&world[x+1][y-1]==1) {
    neighbours++;
  }
  /*   ---
  *    Xo-
  *    ---
  */
  if(y > 0 && world[x][y-1]==1) {
    neighbours++;
  }
  return neighbours;
}
