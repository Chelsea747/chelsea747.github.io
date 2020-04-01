let snake;
let food;
let canvas;
let score = 0;
let restart = false;
const URL = "./my-pose-model/";
let model, webcam, ctx, labelContainer, maxPredictions;
function preload() {
  beep = loadSound('sounds/beep.mp3');
  oof = loadSound('sounds/gameover.mp3');
}
function setup() {
  canvas = createCanvas(400, 400);
  canvas.position((windowWidth-width)/2,0);
  frameRate(5);
  snake = new Snake();
  createFood();
  pose_init();
}
function createFood() {
  let x = floor(random(width/20)) * 20;
  let y = floor(random(height/20)) * 20;
  food = createVector(x,y);
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1*20,0);
  }
  if (keyCode === RIGHT_ARROW) {
    snake.setDir(1*20,0);
  }
  if (keyCode === UP_ARROW) {
    snake.setDir(0,-1*20);
  }
  if (keyCode === DOWN_ARROW) {
    snake.setDir(0,1*20);
  }
}
function draw() {
  background(220);
  fill(0);
  textSize(40);
  text("Score: " + score,10,30);
  if (restart == true) {
    restart = false;
    snake = new Snake;
    score = 0;
    background(220);
    loop();
  }
  if(snake.eat(food)) {
    createFood();
    score += 1;
    beep.play();
  }
  fill(255,0,0);
  rect(food.x,food.y,20,20);
  snake.show();
  snake.update();
  
  if (snake.gameOver()) {
    background(255,0,0);
    console.log("bye! deaddddddddddddd");
    noLoop();
    oof.play();
    text("Score: " + score,10,30);
  } 
}
function mousePressed() {
  restart = true;
  loop();
}
async function pose_init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the pose library adds a tmPose object to your window (window.tmPose)
  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const size = 200;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(pose_loop);

  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  canvas.width = size;
  canvas.height = size;
  ctx = canvas.getContext("2d");
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function pose_loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(pose_loop);
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);
  //console.log(prediction);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
  
  sortedPre = prediction.slice().sort(function (a,b) {
    return b.probability-a.probability;
  });
  console.log(sortedPre);

  output = sortedPre[0].className;
  console.log(output);
  if(output =='Up') {
    snake.setDir(0,-1*20);
  }
  else if(output =='Down') {
    snake.setDir(0,1*20);
  }
  else if(output =='Left') {
    snake.setDir(-1*20,0);
  }
  else if(output =='Right') {
    snake.setDir(1*20,0);
  }
  else if(output =='Next') {
    snake.grow();
  }
  drawPose(pose);
}
function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
  }
}