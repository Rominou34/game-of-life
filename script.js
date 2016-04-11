var world = [];
var buffer = [];
var interv;
var game;

window.onload = function() {
  game = document.getElementById("game");
  world = randomWorld(60,90, 0.15);
  initMap();
  //draw(world);
}

function start() {
  interv = setInterval(iterate, 80);
}

function initMap() {
  for(var i=0; i < world.length; i++) {
    var ligne = document.createElement("div");
    for(var j=0; j < world[i].length; j++) {
      var cell = document.createElement("div");
      ligne.appendChild(cell);
    }
    game.appendChild(ligne);
  }
}

function draw(w) {
  var line = document.querySelectorAll("#game > div");
  for(var i=0; i < line.length; i++) {
    var blocks = line[i].querySelectorAll("div");
    for(var j=0; j < blocks.length; j++) {
      if(w[i][j]==1) {
        blocks[j].style.backgroundColor = "#2b6493";
      } else {
        blocks[j].style.backgroundColor = "#FFF";
      }
    }
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
