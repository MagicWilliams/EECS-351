var gl;
var g_canvas = document.getElementById("webgl");

var g_last = Date.now();				// Timestamp for most-recently-drawn image;
var g_currentAngle1 = 0.0
var g_isRunning = 1;
var g_angleStep1 = 25.0
var g_currSpeed;

  // 1.0, .68, .84, 1.0 - killa cam pink
  // .062, .753, 1, 1.0 - "respect my crip'n" blue
  // 1.0, .274, .274, - Big B's! Bompton Blood
  // .365, .933, .733, 1.0 - IceCream15
  // 1.0, .824, .265, 1.0,

function main() {
//-------------------------------------------------------------------
  gl = init();    // from Bommier's 'lib1' library:
  gl.disable(gl.CULL_FACE); // SHOW BOTH SIDES of all triangles

  gl.depthFunc(gl.LESS);
	gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.2, 0.2, 0.2, 1.0);

  // assigning functions to mouse events within the canvas

  var myMatrix = new Matrix4();

  appendTower();
  appendRoter();
  appendJewel();
  drawAll(myMatrix);
  tick(myMatrix);

  g_canvas.onmousedown	=	function(ev){myMouseDown() };
  g_canvas.onmouseup = 		function(ev){myMouseUp()};


  window.addEventListener("keydown", myKeyDown, false);
	window.addEventListener("keyup", myKeyUp, false);
	window.addEventListener("keypress", myKeyPress, false);
}

function tick(myMatrix) {
  g_currentAngle1 = animate(g_currentAngle1);
  drawAll(myMatrix);
  requestAnimationFrame(tick, g_canvas);
  g_angleStep1 = 25.0*obj.speed;
  g_currSpeed = obj.speed / 3 * 100;
  const string = (obj.speed > 310) ?
    'Current Speed: ' + g_currSpeed+'% (Maximum Speed Reached)' :
    (obj.speed < 0.1) ? 'Current Speed: ' + g_currSpeed+'% (Minimum Speed Reached)' :
  document.getElementById("speed").innerHTML = 'Current Speed: ' + g_currSpeed+'%';

};

function animate(angle) {
//-----------------------------------------------------------------------------
  if (!g_isRunning) {
    return newAngle;
  } else {
    var now = Date.now();
    var elapsed = now - g_last;   // current time - previous-frame timestamp.

    g_last = now;                 // set new timestamp.
    var newAngle = angle + (g_angleStep1 * elapsed) / 1000.0;
    return newAngle %= 360;       // RETURN it
  }
}

function getTowerVertices(i) { //given an index, return the corresponding elements of the vertices array
  const towerVerts = [
    -1.0, 1.0, -1.0, 1.0, // 0 Left Top Back
    -1.0, 1.0, 1.0, 1.0,   // 1 Left Top Front
    1.0, 1.0, -1.0, 1.0,  // 2 Right Top Back
    1.0, 1.0, 1.0, 1.0,   // 3 Right Top Front

    // FOR THE RECTANGULAR PRISM BODY OF TOWER
    -0.5, 0.5, -0.5, 1.0,  // 4 Left Top Back
    -0.5, 0.5, 0.5, 1.0,    // 5 Left Top Front
    0.5, 0.5, -0.5, 1.0,   // 6 Right Top Back
    0.5, 0.5, 0.5, 1.0,    // 7 Right Top Front
    -0.5, -0.5, -0.5, 1.0,  // 8 Left Bottom Back
    -0.5, -0.5, 0.5, 1.0,    // 9 Left Bottom Front
    0.5, -0.5, -0.5, 1.0,   // 10 Right Bottom Back
    0.5, -0.5, 0.5, 1.0,    // 11 Right Bottom Front

    -1.0, -1.0, -1.0, 1.0, // 12 Left Bottom Back
    -1.0, -1.0, 1.0, 1.0,   // 13 Left Bottom Front
    1.0, -1.0, -1.0, 1.0,  // 14 Right Bottom Back
    1.0, -1.0, 1.0, 1.0,   // 15 Right Bottom Front

    // Trapezoidal Midpoints
    0.0, -1.0, 1.0, 1.0,   // 16 Front Face Bottom Midpoint
    1.0, -1.0, 0.0, 1.0,   // 17 Right Face Bottom Midpoint
    0.0, -1.0, -1.0, 1.0,  // 18 Back Face Bottom Midpoint
    -1.0, -1.0, 0.0, 1.0,   // 19 Left Face Bottom Midpoint

    0.0, 1.0, 1.0, 1.0,   // 20 Front Face Top Midpoint
    1.0, 1.0, 0.0, 1.0,   // 21 Right Face Top Midpoint
    0.0, 1.0, -1.0, 1.0,  // 22 Back Face Top Midpoint
    -1.0, 1.0, 0.0, 1.0,   // 23 Left Face Top Midpoint
  ];

  var index = i * 4 // 3 vertices + 1 weight value
  return towerVerts.slice(index, index+4);
}
function getJewelVertices(i) { //given an index, return the corresponding elements of the vertices array
  const jewelVerts = [
    0.0, 0.0, .750, 1.00, // 0: Top Point

    1.00, 0.00, .250, 1.00, // 1: Top Hexagon - 0 degrees
    0.50, .866, .250, 1.00, // 2: Top Hexagon - 60 degrees
    -0.50, .866, .250, 1.00, // 3: Top Hexagon - 120 degrees
    -1.00, 0.00, .250, 1.00, // 4: Top Hexagon - 180 degrees
    -0.50, -.866, .250, 1.00, // 5: Top Hexagon - 240 degrees
    0.50, -.866, .250, 1.00, // 6: Top Hexagon - 300 degrees

    1.00, 0.00, -.250, 1.00, // 7: Bottom Hexagon - 0 degrees
    0.50, .866, -.250, 1.00, // 8: Bottom Hexagon - 60 degrees
    -0.50, .866, -.250, 1.00, // 9: Bottom Hexagon - 120 degrees
    -1.00, 0.00, -.250, 1.00, // 10: Bottom Hexagon - 180 degrees
    -0.50, -.866, -.250, 1.00, // 11: Bottom Hexagon - 240 degrees
    0.50, -.866, -.250, 1.00, // 12: Bottom Hexagon - 300 degrees

    0.0, 0.0, -.750, 1.00, // 13: Bottom Point
  ];

  var index = i * 4 // 3 vertices + 1 weight value
  return jewelVerts.slice(index, index+4);
}
function getRoterVertices(i) { //given an index, return the corresponding elements of the vertices array
  const roterVerts = [
    -.25, .25, .1, 1.0, // 1, CORE Top Left
    -.25, -.25, .1, 1.0, // 2, CORE Bottom Left
    .25, .25, .1, 1.0, // 3, CORE Top Right
    .25, -.25, .1, 1.0, // 4, CORE Bottom Right

    -.25, 1.0, .1, 1.0, // 5, Top Roter, Front Left
    -.25, 1.0, -.1, 1.0, // 6, Top Roter, Back Left
    .25, 1.0, -.1, 1.0, // 7, Top Roter, Back Right
    .25, 1.0, .1, 1.0, // 8, Top Roter, Front Right

    -1.0, .25, .1, 1.0, // 9 , Left Roter, Top Front
    -1.0, .25, -.1, 1.0, // 10 Left Roter, Top back
    -1.0, -.25, -.1, 1.0, // 11, Left Roter, Bottom back
    -1.0, -.25, .1, 1.0, // 12, Left Roter, Bottom Front

    1.0, .25, .1, 1.0, // 13, Right Roter Top Front
    1.0, .25, -.1, 1.0, // 14, Right Roter Top Back
    1.0, -.25, -.1, 1.0, // 15, Right Roter Bottom Back
    1.0, -.25, .1, 1.0, // 16 Right Roter Bottom Front

    -.25, -1.0, .1, 1.0, // 17 Bottom Roter, Left Front
    .25, -1.0, .1, 1.0, // 18 Bottom Roter, Right Front
    .25, -1.0, -.1, 1.0, // 19 Bottom Roter, Right Back
    -.25, -1.0, -.1, 1.0, // 20 Bottom Roter, Left Back

    -.25, .25, -.1, 1.0, // 21, CORE Top Left
    -.25, -.25, -.1, 1.0, // 22, CORE Bottom Left
    .25, .25, -.1, 1.0, // 23, CORE Top Right
    .25, -.25, -.1, 1.0, // 24, CORE Bottom Right
  ];

  var index = i * 4 // 3 vertices + 1 weight value
  return roterVerts.slice(index, index+4);
}

function appendJewel() {
  const jewelIndices = [
    0, 1, 2, 3, 4, 5, 6, 1,         // Triangle Fan A
    13, 7, 8, 9, 10, 11, 12, 7,      // Triangle Fan B

    5, 4, 10,                   // Triangles for hexagonal walls
    10, 11, 5,
    6, 5, 11,
    11, 12, 6,
    1, 6, 12,
    12, 7, 1,
    2, 1, 7,
    7, 8, 2,
    3, 2, 8,
    8, 9, 3,
    4, 3, 9,
    9, 10, 4
  ];

  var jewelVerts = [];
  for (var a = 0; a < jewelIndices.length; a++) {
    jewelVerts = jewelVerts.concat(getJewelVertices(jewelIndices[a]));
  }

  const jewelColors = [

    // 50 colors needed
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, .7, .2, 1.0,
    0.0, .7, .2, 1.0,
    0.0, .7, .2, 1.0,
    0.0, .7, .2, 1.0,
    0.0, .7, .2, 1.0,
    0.0, .7, .2, 1.0,
    0.0, .7, .2, 1.0,
    0.0, .7, .2, 1.0,
    0.0, .7, .2, 1.0,
    0.0, .7, .2, 1.0,

    0.0, 0.1, 0.9, 1.0,
    0.0, 0.1, 0.9, 1.0,
    0.0, 0.1, 0.9, 1.0,
    0.4, 0.4, 0.9, 1.0,
    0.4, 0.4, 0.9, 1.0,
    0.4, 0.4, 0.9, 1.0,
    0.4, 0.4, 0.7, 1.0,
    0.4, 0.4, 0.7, 1.0,
    0.4, 0.4, 0.7, 1.0,
    0.4, 0.4, 0.7, 1.0,

    0.9, .1, 0.0, 1.0,
    0.9, .1, 0.0, 1.0,
    0.9, .1, 0.0, 1.0,
    0.9, .4, 0.4, 1.0,
    0.9, .4, 0.4, 1.0,
    0.9, .4, 0.4, 1.0,
    0.9, .4, 0.4, 1.0,
    0.9, .4, 0.4, 1.0,

// Red & Pink Cap
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .85, .85, 1.0,


    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .85, .85, 1.0,
    1.0, .85, .85, 1.0,

    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,

    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,











  ];

  appendPositions(jewelVerts);
  appendColors(jewelColors);
}
function appendRoter() {
  const roterIndices = [

    // Top Roter
    7, 4, 0,
    0, 2, 7,
    6, 7, 2,
    2, 22, 6,
    5, 6, 22,
    22, 20, 5,
    4, 5, 20,
    20, 0, 4,
    5, 6, 4,
    4, 7, 6,


    // Right Roter
    15, 12, 2,
    2, 3, 15,
    14, 15, 3,
    3, 23, 14,
    13, 14, 23,
    23, 22, 13,
    12, 13, 22,
    22, 2, 12,
    12, 13, 14,
    14, 15, 12,


    // Bottom Roter

    3, 1, 16,
    16, 17, 3,
    23, 3, 17,
    17, 18, 23,
    21, 23, 18,
    18, 19, 21,
    1, 21, 19,
    19, 16, 1,
    18, 19, 16,
    16, 17, 18,

    // Left roter
    8, 9, 10,
    10, 11, 8,
    8, 11, 1,
    1, 0, 8,
    9, 8, 0,
    0, 20, 9,
    10, 9, 20,
    20, 21, 10,
    11, 10, 1,
    1, 21, 11,

    // Core Covers
    2, 0, 1,
    1, 3, 2,
    22, 20, 21,
    21, 23, 22
  ];

  var roterVerts = [];
  const roterColors = [

    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .824, .265, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .274, .274, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    1.0, .68, .84, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .365, .933, .733, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
    .062, .753, 1, 1.0,
  ];

  for (var a = 0; a < roterIndices.length; a++) {
    roterVerts = roterVerts.concat(getRoterVertices(roterIndices[a]));
  }

  appendPositions(roterVerts);
  appendColors(roterColors);
}
function appendTower() {
  const towerBodyIndices = [

    // Front Face
    7, 5, 9,
    9, 11, 7,
    // Right Face
    6, 7, 11,
    11, 10, 6,
    // Back Face
    4, 6, 10,
    10, 8, 4,
    // Right Face
    5, 4, 8,
    8, 9, 5,

    // Super Bass
    14, 12, 13,
    13, 15, 14,

    // Super Top
    2, 0, 1,
    1, 3, 2,

    // Trapezoidal Strips - Bottom
    13, 9, 16, 11, 15,
    15, 11, 17, 10, 14,
    14, 10, 18, 8, 12,
    12, 8, 19, 9, 13,

    // Trapezoidal Strips - Top
    1, 5, 20, 7, 3,
    3, 7, 21, 6, 2,
    2, 6, 22, 4, 0,
    0, 4, 23, 5, 1,
  ];

  const towerColors = [ // 54 colors, every 3 should be the same, for a total of
    //18 different colors/triangles

    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,

    .5, 0.5, 1, 1,
    .5, 0.5, 1, 1,
    .5, 0.5, 1, 1,
    .5, 0.5, 1, 1,
    .5, 0.5, 1, 1,
    .5, 0.5, 1, 1,

    .2, 0.5, .1, 1,
    .2, 0.5, .1, 1,
    .2, 0.5, .1, 1,
    .2, 0.5, .1, 1,
    .2, 0.5, .1, 1,
    .2, 0.5, .1, 1,

    0.0, 0.0, .6, 1,
    0.0, 0.0, .6, 1,
    0.0, 0.0, .6, 1,
    0.0, 0.0, .6, 1,
    0.0, 0.0, .6, 1,
    0.0, 0.0, .6, 1,

    // Super Base Colors
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,

    // Super Top Colors
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,
    .5, 0.0, 1, 1,

    // Red Trapezoidal S1 - bottom
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,

    // Blue Trapezoidal S2 - bottom
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,

    // Yellow Trapezoidal S3 - bottom
    1.0, 1.0, 0.6, 1.0,
    1.0, 1.0, 0.6, 1.0,
    1.0, 1.0, 0.6, 1.0,
    1.0, 1.0, 0.6, 1.0,
    1.0, 1.0, 0.6, 1.0,

    // Green Trapezoidal S4 - bottom
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,

    // Blue Trapezoidal S1 - Top
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,

    // Red Trapezoidal S2 - Top
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,


    // Yellow Trapezoidal S3 - Top
    1.0, 1.0, 0.6, 1.0,
    1.0, 1.0, 0.6, 1.0,
    1.0, 1.0, 0.6, 1.0,
    1.0, 1.0, 0.6, 1.0,
    1.0, 1.0, 0.6, 1.0,

    // Orange Trapezoidal S4 - Top
    1.0, 0.8, 0.0, 1.0,
    1.0, 0.8, 0.0, 1.0,
    1.0, 0.8, 0.0, 1.0,
    1.0, 0.8, 0.0, 1.0,
    1.0, 0.8, 0.0, 1.0,
  ];


  var towerVerts = [];

  for (var a = 0; a < towerBodyIndices.length; a++) {
    towerVerts = towerVerts.concat(getTowerVertices(towerBodyIndices[a]));
  }

  appendPositions(towerVerts);
  appendColors(towerColors);
}

function myMouseDown() {
  obj.speed = .2;
}

function myMouseUp() {
  obj.speed = 3;
}

function myKeyDown(ev) {
	switch(ev.keyCode) {
    case 32:
      console.log("Spacebar triggered. Slowing animation until released.");
      myMouseDown();
    case 37:		// left-arrow key
			// print in console:
			console.log(' left-arrow.');
      if (obj.speed * .9 >= .1) {
			  obj.speed *= .9;
      }
			break;
		case 39:		// right-arrow key
			console.log('right-arrow.');
      if (obj.speed * 1.1 <= 10) {
        obj.speed *= 1.1;
        console.log(obj.speed);
      }
  		break;

		default:
			console.log('myKeyDown()--keycode=', ev.keyCode, ', charCode=', ev.charCode);
  		document.getElementById('Result').innerHTML =
  			'myKeyDown()--keyCode='+ev.keyCode;
			break;
	}
}

function myKeyUp(ev) {
//===============================================================================
// Called when user releases ANY key on the keyboard; captures scancodes well

	console.log('Key: ' + +ev.keyCode+' has been released.');
  if (ev.keyCode == 32) {
    console.log('Resuming animation');
    myMouseUp();
  }
}

function myKeyPress(ev) {
//===============================================================================
// Best for capturing alphanumeric keys and key-combinations such as
// CTRL-C, alt-F, SHIFT-4, etc.
	console.log('myKeyPress():keyCode='+ev.keyCode  +', charCode=' +ev.charCode+
												', shift='    +ev.shiftKey + ', ctrl='    +ev.ctrlKey +
												', altKey='   +ev.altKey   +
												', metaKey(Command key or Windows key)='+ev.metaKey);
}

function drawAll(myMatrix) {
  // DRAW TOWER
  gl.clear(gl.COLOR_BUFFER_BIT);
  myMatrix = new Matrix4();
  myMatrix.setTranslate(-.4, -.5, 0);
  myMatrix.rotate(g_currentAngle1, -.15, -.6, .15);
  myMatrix.scale(.3, .3, .3);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 0, 36); // 3 vertices per triangle, 12 triangles
  gl.drawArrays(gl.TRIANGLE_STRIP, 36, 20); // 5 vertices per triangle strip, 4 strips to construct trapezoidal base
  gl.drawArrays(gl.TRIANGLE_STRIP, 56, 20); // 5 vertices per triangle strip, 4 strips to construct trapezoidal top

  pushMatrix(myMatrix) // Save current state

  // DRAW ROTERS (FIRST SET)
  myMatrix.translate(1, 1, 1);
  myMatrix.scale(0.5, .5, .5);
  myMatrix.rotate(90, 1, 0, 0);
  myMatrix.rotate(-35, 0, 1, 0);
  myMatrix.rotate(g_currentAngle1, 0, 0, 1);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix.rotate(g_currentAngle1 * 5, 0, 1, 0);
  myMatrix.translate(0, .5, 0);
  myMatrix.scale(.5, .6, .5);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix = popMatrix(); // Retrieve previously saved state
  pushMatrix(myMatrix);

  //
  myMatrix.translate(-1, 1, 1);
  myMatrix.scale(0.5, .5, .5);
  myMatrix.rotate(90, 1, 0, 0);
  myMatrix.rotate(35, 0, 1, 0);
  myMatrix.rotate(g_currentAngle1, 0, 0, 1);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix.rotate(g_currentAngle1 * 5, 0, 1, 0);
  myMatrix.translate(0, .5, 0);
  myMatrix.scale(.5, .6, .5);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix = popMatrix(); // Retrieve previously saved state
  pushMatrix(myMatrix);

  myMatrix.translate(-1, 1, -1);
  myMatrix.scale(0.5, .5, .5);
  myMatrix.rotate(90, 1, 0, 0);
  myMatrix.rotate(35, 0, 1, 0);
  myMatrix.rotate(g_currentAngle1, 0, 0, 1);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix.rotate(-90, 1, 0, 0);
  myMatrix.rotate(g_currentAngle1 * 5, 0, 1, 0);
  myMatrix.translate(0, .5, 0);
  myMatrix.scale(.5, .6, .5);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix = popMatrix(); // Retrieve previously saved state
  pushMatrix(myMatrix);

  myMatrix.translate(1, 1, -1);
  myMatrix.scale(0.5, .5, .5);
  myMatrix.rotate(90, 1, 0, 0);
  myMatrix.rotate(-35, 0, 1, 0);
  myMatrix.rotate(g_currentAngle1, 0.05, 0.1, 1);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix.rotate(-90, 1, 0, 0);
  myMatrix.rotate(g_currentAngle1 * 5, 0, 1, 0);
  myMatrix.translate(0, .5, 0);
  myMatrix.scale(.5, .6, .5);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);


  // DRAW HEXADROID
  myMatrix.setTranslate(.2, .5, 0); // RESETTING CAMERA TO MOVE FROM ORIGIN
  myMatrix.scale(.5, .5, .5);
  myMatrix.rotate(g_currentAngle1, .1, .8, -.6);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLE_FAN, 208, 8);
  gl.drawArrays(gl.TRIANGLE_FAN, 216, 8);
  gl.drawArrays(gl.TRIANGLES, 224, 36) // 3 vertices per triangle, 12 triangles
  pushMatrix(myMatrix);

  // DRAW SPINNERS ON HEXADROID
  myMatrix.translate(0, 0, -.75);
  myMatrix.rotate(-g_currentAngle1 * 2, 0, 0, 1);
  myMatrix.scale(.7, .2, .2);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);
  pushMatrix(myMatrix);

  // SECOND BATCH OF SPINNER GUN THINGS
  myMatrix.translate(.5, 0, 0);
  myMatrix.rotate(90, 1, 0, 0);
  myMatrix.rotate(g_currentAngle1*3, 1, 0, 0)
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix = popMatrix();
  myMatrix.translate(-.5, 0, 0);
  myMatrix.rotate(90, 1, 0, 0);
  myMatrix.rotate(-g_currentAngle1*3, 1, 0, 0)
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix = popMatrix();
  myMatrix.translate(0, 0, .75);
  myMatrix.rotate(g_currentAngle1 * 2, 0, 0, 1);
  myMatrix.scale(.7, .2, .2);
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);
  pushMatrix(myMatrix);

  // SECOND BATCH OF SPINNER GUN THINGS
  myMatrix.translate(.5, 0, 0);
  myMatrix.rotate(90, 1, 0, 0);
  myMatrix.rotate(g_currentAngle1*3, 1, 0, 0)
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);

  myMatrix = popMatrix();
  myMatrix.translate(-.5, 0, 0);
  myMatrix.rotate(90, 1, 0, 0);
  myMatrix.rotate(-g_currentAngle1*3, 1, 0, 0)
  updateModelMatrix(myMatrix);
  gl.drawArrays(gl.TRIANGLES, 76, 132);
}
