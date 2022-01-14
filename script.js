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

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

// All variables for current block
var nodes = [[-100, -100, -100], [-100, -100, 100], [-100, 100, -100], [-100, 100, 100], [ 100, -100, -100], [ 100, -100, 100], [ 100, 100, -100], [ 100, 100, 100]];
var edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

// Drawing the block (kinda)
function drawBlock () {
  // Making it look kinda good
  fill('white');
  strokeWeight('10');

  // Extra stuff
  translate(720, 360)

  // Going through all of the nodes and drawing them
  for(var i = 0; i < nodes.length; i++) {
    point(nodes[i][0], nodes[i][1]);
  }
  // Going through all of the edges and drawing them
  for(var i = 0; i < edges.length; i++) {
    line(nodes[edges[i][0]][0], nodes[edges[i][0]][1], nodes[edges[i][1]][0], nodes[edges[i][1]][1]);
  }
}

function rotateBlockZ(angle) {
  for(var i = 0; i < nodes.length; i++) {
    var x = nodes[i][0];
    var y = nodes[i][1];
    nodes[i][0] = x * cos(angle) - y * sin(angle);
    nodes[i][1] = y * cos(angle) + x * sin(angle);
  }
}

function rotateBlockX(angle) {
  for(var i = 0; i < nodes.length; i++) {
    var y = nodes[i][1];
    var z = nodes[i][2];
    nodes[i][1] = y * cos(angle) - z * sin(angle);
    nodes[i][2] = z * cos(angle) + y * sin(angle);
  }
}

function rotateBlockY(angle) {
  for(var i = 0; i < nodes.length; i++) {
    var x = nodes[i][0];
    var z = nodes[i][2];
    nodes[i][0] = x * cos(angle) + z * sin(angle);
    nodes[i][2] = z * cos(angle) - x * sin(angle);
  }
}

mouseDragged = function() {
  rotateBlockY((mouseX - pmouseX)/100);
  rotateBlockX((mouseY - pmouseY)/100);
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

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
    background('blue');
    drawBlock();
}
