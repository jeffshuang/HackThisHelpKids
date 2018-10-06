var bird;
var img;
var x = 0;
var clicked = false;

function preload() {
  img = loadImage("PENGUIN.jpg");
}

function setup() {
  createCanvas(1000, 700);
  bird = new Bird();
}

function draw() {
  background(img);
  textSize(30);
  text(str(x), 20, 40);
  bird.update();
  bird.show();
  if (mouseIsPressed) {
    bird.up();
    bird.egg += 100;
    if (clicked == false) {
      x += 1;
      clicked = true;
      bird.up();
      bird.egg += 100;
      bird.flap += 10;
    }
  }
  if (!mouseIsPressed) {
    clicked = false;
    bird.flap = 0;
  }
  if (keyIsPressed) {
    bird.double = 2;
    bird.gravity = 10;
  }
  if (!keyIsPressed) {
    bird.double = 1;
    bird.gravity = 0.5;
  }
}

function Bird() {
  this.y = height / 2;
  this.x = 200;

  this.egg = 0;
  this.flap = 0;
  this.tiltx = 0;
  this.tilty = 0;

  this.gravity = 0.5;
  this.lift = -5;
  this.velocity = 0;

  this.double = 1;

  this.show = function() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y + 5 + this.egg, 40, 45);

    fill(250, 128, 122);
    noStroke();
    ellipse(this.x, this.y, 100 * this.double, 100 * this.double);
    fill(250, 128, 122);
    noStroke();
    ellipse(this.x, this.y - 10, 90 * this.double, 90 * this.double);
    fill(250, 128, 122);
    noStroke();
    ellipse(this.x, this.y - 20, 80 * this.double, 80 * this.double);
    fill(250, 128, 122);
    noStroke();
    ellipse(this.x, this.y - 30, 70 * this.double, 70 * this.double);
    fill(250, 128, 122);
    noStroke();
    ellipse(this.x, this.y - 40, 60 * this.double, 60 * this.double);
    fill(250, 128, 122);
    noStroke();
    ellipse(this.x, this.y - 50, 50 * this.double, 50 * this.double);
    fill(255);
    noStroke();
    ellipse(this.x - 10, this.y - 50, 5 * this.double, 5 * this.double);
    ellipse(this.x + 10, this.y - 50, 5 * this.double, 5 * this.double);
    ellipse(this.x - 10, this.y - 50, 5 * this.double, 5 * this.double);
    ellipse(this.x + 10, this.y - 50, 5 * this.double, 5 * this.double);
    fill(250, 128, 122);
    ellipse(
      this.x - 40,
      this.y - 35 + this.flap,
      20 * this.double,
      10 * this.double
    );
    fill(250, 128, 122);
    ellipse(
      this.x + 40,
      this.y - 35 + this.flap,
      20 * this.double,
      10 * this.double
    );

    fill(255);
    noStroke();
    ellipse(this.x, this.y + 5, 60, 65);

    fill(255, 255, 0);
    noStroke();
    ellipse(this.x, this.y - 40, 10, 5);
  };

  this.up = function() {
    this.velocity += this.lift;
  };

  this.update = function() {
    this.x = mouseX;
    // this.y = (mouseY);
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height - 80) {
      this.y = height - 80;
      this.velocity = 0;
    }

    if (this.y < 80) {
      this.y = 80;
      this.velocity = 0;
    }

    if (this.x > width - 80) {
      this.x = width - 80;
      this.velocity = 0;
    }

    if (this.x < 80) {
      this.x = 80;
      this.velocity = 0;
    }
  };
}
