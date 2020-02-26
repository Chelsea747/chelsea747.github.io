class Cactus {
  constructor() {
    this.r = 70;
    this.x = width;
    this.y = height - this.r;
  }
  show() {
        image(cactus_image,this.x,this.y,this.r,this.r);
    noFill();
    rect(this.x,this.y,this.r,this.r);
  }
  move() {
    this.x -= 7;
  }
} 