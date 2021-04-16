
/*ALL CREDIT GOES TO THE CODING TRAIN, THEY ARE AWESOME
https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
*/

let walls = [];
let ray;
let particle;

// to decide what view we are using
let mode = 0;

// set dimensions for canvas
var CANVAS_WIDTH = window.innerHeight;
var CANVAS_HEIGHT = window.innerHeight;

function setup() {
  //setup canvas
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  //create random walls
  for (let i = 0; i < 5; i++)
  {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1,y1,x2,y2);
  }

  // add boundary walls
      //top
      walls.push(new Boundary(0,0,window.innerWidth,0));
      //bottom
      walls.push(new Boundary(0,window.innerHeight,window.innerWidth,window.innerHeight));
      //left
      walls.push(new Boundary(0,0,0,window.innerHeight));
      //right
      walls.push(new Boundary(window.innerWidth,0,window.innerWidth,window.innerHeight));
  
  // create ray emitter
  particle = new Particle(50, 3);
}


function renderManager()
{
  if (mode == 0)
  {
    // function for the 2D view
    render2D();
  }else {
    // function for the 3D view
    render3D(particle.look(walls), 500);
  }
  
  
}

function draw() {
  // make background
  background(0);

  
 
  //update player/particle
 // particle.update(mouseX, mouseY);
  
  particle.look(walls);
  
  //function to decide view mode
  renderManager();
   
  //function for controls
  playerController();

}

function playerController()
{
  //particle turning
  if (keyIsDown(LEFT_ARROW)) {
    particle.turn(2, -1);
  } 
  
  if (keyIsDown(RIGHT_ARROW)) {
    particle.turn(2, 1);
  }

  //particle movement
  if (keyIsDown(UP_ARROW)) {
    particle.move(1);
  } 
  
  if (keyIsDown(DOWN_ARROW)) {
    particle.move(-1);
  }

  if (keyIsDown(84))
  {
    mode = 0;
  }

  if (keyIsDown(82))
  {
    mode = 1;
  }
  

}

function render2D()
{
  //render walls
  for (let wall of walls)
  {
    wall.show();  
  }

  //render player
  particle.show();


}

function render3D(distArray, vision)
{ 
  
  //for each ray
  for (let i = 0; i < distArray.length; i++)
  {
    
    // //styling
    // fill(0,0,255);
    // //positions
    noStroke();
     let rectXpos = i * CANVAS_WIDTH / distArray.length;
     let rectHeight = ((vision - distArray[i]) / vision) * CANVAS_HEIGHT;
     let rectYpos =  (CANVAS_HEIGHT/2) - (rectHeight/2);
     let rectWidth = CANVAS_WIDTH / distArray.length;

    stroke(rectHeight/CANVAS_HEIGHT * 255);
    
    if (rectHeight < 0)
    {
      rectHeight = 0;
    }
    
     rect(rectXpos,rectYpos,rectWidth,rectHeight);
     stroke(0);

    // console.log("X:" + rectXpos + " Y:" + rectYpos + "  W:" + rectWidth + "  H:" + rectHeight);
    
    // //make a ray
    // rect(rectXpos, rectYpos, rectWidth, rectHeight);
  }

  
  

  

  
}

