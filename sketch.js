
/*2D RAYCAST CREDIT GOES TO THE CODING TRAIN, THEY ARE AWESOME
https://www.youtube.com/watch?v=TOEi6T2mtHo&ab_channel=TheCodingTrain
*/

let walls = [];
let ray;
let particle;

// to decide what view we are using
let mode = 0;

// set dimensions for canvas
var CANVAS_WIDTH = window.innerHeight / 1.1;
var CANVAS_HEIGHT = window.innerHeight / 1.1;

function setup() {
  //setup canvas
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  //create random walls
  for (let i = 0; i < 100; i++)
  {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1,y1,x2,y2);
  }

  // add boundary walls
      //top
      walls.push(new Boundary(0,0,CANVAS_WIDTH,0));
      //bottom
      walls.push(new Boundary(0,CANVAS_HEIGHT,CANVAS_WIDTH,CANVAS_HEIGHT));
      //left
      walls.push(new Boundary(0,0,0,CANVAS_HEIGHT));
      //right
 
      walls.push(new Boundary(CANVAS_WIDTH,0,CANVAS_WIDTH,CANVAS_HEIGHT));
      
  // create ray emitter
  particle = new Particle(50, 0.25);
}


function renderManager()
{
  if (mode == 0)
  {
    // function for the 2D view
    render2D();
  }else {
    // function for the 3D view
    render3D(particle.look(walls), 1000);
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

//function to correct fish eye
function lensCorrect(i, length)
{
  let range = (i/length * 4)

  let equation = (range - 2) * (range - 2) * .01 + .95;
  return equation;
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

    /*Old code for height: 
           let rectHeight = ((vision - distArray[i]) / vision) * CANVAS_HEIGHT;
    (fish eye effect)


      *buggy but no fish eye
    //  var z = distArray[i] * Math.cos(i, particle.getFov());
    //  let rectHeight = CANVAS_HEIGHT/z
    */
   // Modify distance to prevent fish eye effect
      // let perAngle = (i/distArray.length) * particle.getFov();
      // let a = (i <= distArray/2)  ? (distArray.length/2 - perAngle) + particle.getDegree() : (distArray.length/2 + perAngle) + particle.getDegree()
      // distArray[i] *= Math.cos(a);

      // calculated variables for columm dimensions
    let rectHeight = ((vision - distArray[i]) / vision) * CANVAS_HEIGHT;
    rectHeight = CANVAS_HEIGHT / distArray[i];
     let rectXpos = i * CANVAS_WIDTH / distArray.length;
     fill(rectHeight/CANVAS_HEIGHT * 255)
     let rectYpos =  (CANVAS_HEIGHT/2) - (rectHeight/2);
     let rectWidth = CANVAS_WIDTH / distArray.length;

     //correct height
     rectHeight = rectHeight * lensCorrect(i, distArray.length);

    stroke(rectHeight/CANVAS_HEIGHT * 255);
    
    if (rectHeight < 0)
    {
      rectHeight = 0;
    }

    //console.log(lensCorrect(i, distArray.length));
     rect(rectXpos,rectYpos,rectWidth,rectHeight);
     stroke(0);

    // console.log("X:" + rectXpos + " Y:" + rectYpos + "  W:" + rectWidth + "  H:" + rectHeight);
    
    // //make a ray
    // rect(rectXpos, rectYpos, rectWidth, rectHeight);
  }

  
  

  

  
}

