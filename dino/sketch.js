let x = 5;
let img;
let xpos = 0;
let ypos = 0;
let STOOPOD;
let sword;
let sword2;
let dino;
let cactus_image;
let cactus;
let cacti = [];
let soundclassifier;
function preload() {
  // img = loadImage("hi.jpeg");
  img = loadImage("apple.png");
  cactus_image = loadImage("cactus.png");
  const options = { probabilityThreshold: 0.9 };
  soundclassifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
}
function modelReady() {
  console.log("OKAY");
}
function setup() {
  createCanvas(600, 600);
  // STOOPOD = new Dog();
  // STOOPOD.woof();
  // sword = new Sword();
  // sword2 = new Sword
  dino = new Dino();
  cactus = new Cactus();
  soundclassifier.classify(gotResult);
}
function gotResult(error,result) {
  if(error) {
    console.log(error);
    return;
  }
  console.log(result[0]);
  if(result[0].label == 'up') {
    dino.jump();
  }
}
function draw() {
  background(220);
  // fill(255);
  // rect(100, 100, 60, 60);
  // fill(100);
  // circle(300, 300, 50);
  // ellipse(400, 400, 30, 50);
  // sword.show();
  // sword2.show();
  if(random(1) < 0.01) {
    cacti.push(new Cactus());
  }
  
  for(let item of cacti) {
    item.show();
    item.move();
    if(dino.hits(item)) {
      console.log("Game over");
      noLoop();
    }
  }
  
  dino.show();
  dino.move();
  
}

function mouseClicked() {
  console.log(key);
  xpos = mouseX
  ypos = mouseY
  sword = new Sword();
}

function keyPressed() {
  console.log(key);
  if (key == ' ') {
    dino.jump();
  }
  // if (key == 's') {
  //   sword.moveDown();
  // }
  // if (key == 'a') {
  //   sword.moveLeft();
  // }
  // if (key == 'd') {
  //   sword.moveRight();
  // }
}
function mouseClicked() {
  dino.jump();
}