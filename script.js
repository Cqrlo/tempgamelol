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
  cubeSize = [w, d, h, s];
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
  strokeWeight('4');

  // Extra stuff
  translate(640, 360);

  var w = cubeSize[0];
  var d = cubeSize[1];
  var h = cubeSize[2];
  // Goes through all of the cubes and draw the dots and lines
  for(var n = 0; n < cubes.length; n++){
    if(
         (0 <= n && n <= d*h-1)                || (w*h*(d-1) <= n && n <= w*d*h)                      // De eerste en laatste vlak voor de x
      || (-1 <= n % (w*h) && n % (w*h) <= h-1) || (0 <= n % (w*h)-w*(h-1) && n % (w*h)-w*(h-1) <= h)  // De eerste en laatste vlak voor de y
      || (d-1 == n % d)                        || (0 == n % d)                                        // De eerste en laatste vlak voor de z
    ){
      // Going through all of the nodes and drawing them
      for(var e = 0; e < cubes[n].length; e++) {
        point(cubes[n][e][0], cubes[n][e][1]);
      }
      // Going through all of the edges and drawing them
      for(var f = 0; f < edges.length; f++) {
        line(cubes[n][edges[f][0]][0], cubes[n][edges[f][0]][1], cubes[n][edges[f][1]][0], cubes[n][edges[f][1]][1]);
      }
    }
  }
  
  // Goes through all of the cubes and draw the squares
  // This for loop is the same as the one above, but because the squares have to be drawn over the lines and not inbetween it needs to be in a seperate loop
  for(var n = 0; n < cubes.length; n++){
    fill('black');
    textSize(50);
    text(w, 20, 20, 40)
    fill('white');
    if(cubes[w + (0,5 * w - 1)][3][2] >= cubes[w + 0.5 * h + 1 + w * h * (d-1)][3][2]){
      if(0 <= n && n <= d*h-1){
        // De eerste vlak voor de x
        for(var g = 0; g < 6; g++) {
          quad(cubes[n][0][0], cubes[n][0][1], cubes[n][1][0], cubes[n][1][1], cubes[n][3][0], cubes[n][3][1], cubes[n][2][0], cubes[n][2][1]);
        }
      }
    } else {
      if(w*h*(d-1) <= n && n <= w*d*h){ 
        // De laatste vlak voor de x
        for(var g = 0; g < 6; g++) {
          quad(cubes[n][6][0], cubes[n][6][1], cubes[n][7][0], cubes[n][7][1], cubes[n][5][0], cubes[n][5][1], cubes[n][4][0], cubes[n][4][1]);
        }
      }
    }
    if(cubes[w*h+1][5][2] > cubes[w*h*(d-(d*0.5))-3][7][2]){
      if(-1 <= n % (w*h) && n % (w*h) <= h-1){
        // De eerste vlak voor de y
        for(var g = 0; g < 6; g++) {
          quad(cubes[n][0][0], cubes[n][0][1], cubes[n][1][0], cubes[n][1][1], cubes[n][5][0], cubes[n][5][1], cubes[n][4][0], cubes[n][4][1]);
        }
      }
    } else {
      if(0 <= n % (w*h)-w*(h-1) && n % (w*h)-w*(h-1) <= h){
        // De laatste vlak voor de y
        for(var g = 0; g < 6; g++) {
          quad(cubes[n][2][0], cubes[n][2][1], cubes[n][3][0], cubes[n][3][1], cubes[n][7][0], cubes[n][7][1], cubes[n][6][0], cubes[n][6][1]);
        }
      }
    }
    if(cubes[w*h+w][7][2] < cubes[w*h+w*(h*0.5)-1][7][2]){
      if(d-1 == n % d){
        // De eerste vlak voor de z
        for(var g = 0; g < 6; g++) {
          quad(cubes[n][1][0], cubes[n][1][1], cubes[n][3][0], cubes[n][3][1], cubes[n][7][0], cubes[n][7][1], cubes[n][5][0], cubes[n][5][1]);
        }
      }
    } else {
      if(0 == n % d){
        // De laatste vlak voor de z
        for(var g = 0; g < 6; g++) {
          quad(cubes[n][0][0], cubes[n][0][1], cubes[n][2][0], cubes[n][2][1], cubes[n][6][0], cubes[n][6][1], cubes[n][4][0], cubes[n][4][1]);
        }
      }
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
  loadcube(4, 4, 4, 50);
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    background('yellow');
    drawBlock();
}