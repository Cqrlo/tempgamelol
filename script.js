/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;
var s = 0;
var cubes = new Array;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

// All variables for current block
//var nodes = [[-100, -100, -100], [-100, -100, 100], [-100, 100, -100], [-100, 100, 100], [ 100, -100, -100], [ 100, -100, 100], [100, 100, -100], [ 100, 100, 100]];
var edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

function newCubeMakePls(x, y, z) {
  cubes.push([[x, y, z], [x, y, z+100], [x, y+100, z], [x, y+100, z+100], [x+100, y, z], [x+100, y, z+100], [x+100, y+100, z], [x+100, y+100, z+100]]);
}

// Drawing the block (kinda)
function drawBlock() {
  // Making it look kinda good
  fill('white');
  strokeWeight('10');

  // Extra stuff
  translate(640, 360);

  for(var n = 0; n < cubes.length; n++){

    // Going through all of the nodes and drawing them
    for(var i = 0; i < cubes[n].length; i++) {
      point(cubes[n][i][0], cubes[n][i][1]);
    }
    // Going through all of the edges and drawing them
    for(var i = 0; i < edges.length; i++) {
      line(cubes[n][edges[i][0]][0], cubes[n][edges[i][0]][1], cubes[n][edges[i][1]][0], cubes[n][edges[i][1]][1]);
    }
  }
}

function rotateBlockSideways(angle) {
  for(var i = 0; i < cubes.length; i++){
    for(var j = 0; j < cubes[i].length; j++) {
      var x = cubes[i][j][0];
      var z = cubes[i][j][2];
      cubes[i][j][0] = x * cos(angle) - z * sin(angle);
      cubes[i][j][2] = z * cos(angle) + x * sin(angle);
    };
  };
};

function rotateBlockUpwards(angle) {
  for(var i = 0; i < cubes.length; i++){
    for(var j = 0; j < cubes[i].length; j++) {
      var y = cubes[i][j][1];
      var z = cubes[i][j][2];
      cubes[i][j][1] = y * cos(angle) - z * sin(angle);
      cubes[i][j][2] = z * cos(angle) + y * sin(angle);
    };
  };
};

mouseDragged = function() {
  rotateBlockSideways((pmouseX - mouseX)/100);
  rotateBlockUpwards((mouseY - pmouseY)/100);
};

mouseClicked = function() {
  newCubeMakePls(100, 100, 100);
}

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
}


/**
 * draw
 * de code in deze functie wordt 50 keer per seconde uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    background('yellow');
    drawBlock();
    fill('black');
    text((pmouseX - mouseX), 20, 20);
}
