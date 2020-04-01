class Snake {
  constructor() {
    this.body = [];
    this.length = 1;
    this.xdir = 0;
    this.ydir = 0;
    this.body[0] = createVector(0, 0);
  }
  gameOver() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > width || y > height || y < 0 || x < 0) {
      return true;
    }

    for (let ii = 0; ii < this.body.length - 1; ii++) {
      let item = this.body[ii];
      if (item.x == x && item.y == y) {
        return true;
      }
    }
    return false;
  
  }
grow() {
  let head = this.body[this.body.length - 1].copy();
  this.length++;
  this.body.push(head);
}
eat(pos) {
  let x = this.body[this.body.length - 1].x + 10;
  let y = this.body[this.body.length - 1].y + 10;
  if (x > pos.x && y > pos.y && x < pos.x + 20 && y < pos.y + 20) {
    console.log("EATEN!");
    this.grow();
    return true;
  }
  return false;
}
setDir(x, y) {
  this.xdir = x;
  this.ydir = y;
}
update() {
  let head = this.body[this.body.length - 1].copy();
  this.body.shift();
  head.x += this.xdir;
  head.y += this.ydir;
  this.body.push(head);
  // this.body[0].x += this.xdir;
  // this.body[0].y += this.ydir;
}
show() {
  fill(0);
  stroke(255, 215, 0);

  for (let item of this.body) {
    fill(0);
    stroke(255, 215, 0);
    rect(item.x, item.y, 20, 20);
    fill(0, 0, 255);
    circle(item.x + 10, item.y + 10, 5);
  }
}
}