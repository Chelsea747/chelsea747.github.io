class Sword {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 100;
  }
  show() {
    image(img,this.x,this.y,this.w,this.h)
  }
  
  moveUp() {
    this.y -= 5;
  }
  
  moveDown() {
    this.y += 5;
  }
  moveLeft() {
    this.x -= 5;
  }
  moveRight() {
    this.x += 5;
  }
}