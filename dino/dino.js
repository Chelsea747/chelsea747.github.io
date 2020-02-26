class Dino {
  constructor() {
    this.x = 0;
    this.h = 90;
    this.y = height - this.h;
    this.w = 90;
    this.v = 0;
    this.g = 1 ;
    this.a = 0;
  }
  hits(cactus) {
   // console.log(cactus.x);
  let hit = collideRectRect(this.x,this.y,this.w,this.h,cactus.x,cactus.y,cactus.r,cactus.r);

   return hit; 
  }
  show() {
    image(img,this.x,this.y,this.w,this.h);
    noFill();
    rect(this.x,this.y,this.w,this.h);
  }
  jump() {
    this.v = -20;
  }
  
  
  move() {
    this.y += this.v; //change of position
    this.v += this.g; //change of speed
    this.y = constrain(this.y,0,height-this.w)
  }

  // moveUp() {
  //   this.y -= 5;
  // }
  
  // moveDown() { 
  //   this.y += 5;
  // }
  // moveLeft() {
  //   this.x -= 5;
  // }
  // moveRight() {
  //   this.x += 5;
  //}
}