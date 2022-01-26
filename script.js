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

function newCubeMakePls(x, y, z, s) {
  cubes.push([[x, y, z], [x, y, z+s], [x, y+s, z], [x, y+s, z+s], [x+s, y, z], [x+s, y, z+s], [x+s, y+s, z], [x+s, y+s, z+s]]);
}

var cubeSize;
function loadcube(w, d, h, s) {
  cubeSize = [w, d, h];
  for(var i = 1; i < w + 1; i++){
    for(var j = 1; j < d + 1; j++){
      for(var k = 1; k < h + 1; k++){
        newCubeMakePls(i * s, j * s, k * s, s);
      }
    }
  }
}

// Drawing the block (kinda)
function drawBlock() {
  // Making it look kinda good
  fill('white');
  strokeWeight('10');

  // Extra stuff
  translate(640, 360);

  var w = cubeSize[0];
  var d = cubeSize[1];
  var h = cubeSize[2];
  for(var n = 0; n < cubes.length; n++){
    //if((0 <= n && n <= 24) || n == cubes.length - 1){
      // Going through all of the nodes and drawing them
      for(var e = 0; e < cubes[n].length; e++) {
        point(cubes[n][e][0], cubes[n][e][1]);
      }
      // Going through all of the edges and drawing them
      for(var f = 0; f < edges.length; f++) {
        line(cubes[n][edges[f][0]][0], cubes[n][edges[f][0]][1], cubes[n][edges[f][1]][0], cubes[n][edges[f][1]][1]);
      }
    //}

    /*// Going through all of the nodes and drawing them
    for(var e = 0; e < cubes[n].length; e++) {
        point(cubes[n][e][0], cubes[n][e][1]);
    }
    // Going through all of the edges and drawing them
    for(var f = 0; f < edges.length; f++) {
        line(cubes[n][edges[f][0]][0], cubes[n][edges[f][0]][1], cubes[n][edges[f][1]][0], cubes[n][edges[f][1]][1]);
    }*/
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
  loadcube(5, 5, 5, 50);
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