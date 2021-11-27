var bg,bgImg;
var player, shooterImg, shooter_shooting;
var life1, life2, life3;
var lyf1, lyf2, lyf3 ;
var beepSound, loseSound, winSound;
var zombie, zombieImg;
var bullet, bulletImg;
var hiddenLine1, hiddenLine2, hiddenLine3, hiddenLine4;



function preload(){
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  zombieImg = loadImage("assets/zombie.png");
  life1 = loadImage("assets/heart_1.png");
  life2 = loadImage("assets/heart_2.png");
  life3 = loadImage("assets/heart_3.png");
  beepSound = loadSound("assets/explosion.mp3");
  winSound = loadSound("assets/win.mp3");
  loseSound = loadSound("assets/lose.mp3");
  bulletImg = loadImage("assets/bullet.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  hiddenLine1= createSprite(800,360,1800,1);
  hiddenLine2 = createSprite(800,810,1800,1);
  hiddenLine3 = createSprite(1400,450,1,950);
  hiddenLine4 = createSprite(5,450,1,950);
  hiddenLine1.debug = false;
  hiddenLine2.debug = false;
  hiddenLine3.debug = false;
  hiddenLine4.debug = false;
  hiddenLine1.visible = false;
  hiddenLine2.visible = false;
  hiddenLine3.visible = false;
  hiddenLine4.visible = false;
  
  bulletGroup = createGroup();
  zombieGroup = createGroup();

  player = createSprite(displayWidth-1150, displayHeight-450, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.debug = false;
  player.setCollider("rectangle",0,0,300,300);

  lyf1 = createSprite(displayWidth-150,40,20,20);
  lyf1.visible = false;
  lyf1.addImage(life1);
  lyf1.scale = 0.3;

  lyf2 = createSprite(displayWidth-150,40,20,20);
  lyf2.visible = false;
  lyf2.addImage(life2);
  lyf2.scale = 0.3;

  lyf3 = createSprite(displayWidth-150,40,20,20);
  lyf3.visible = true;
  lyf3.addImage(life3);
  lyf3.scale = 0.3;

  
}

function draw() {
  background(0); 

  player.collide(hiddenLine1);
  player.collide(hiddenLine2);
  player.collide(hiddenLine3);
  player.collide(hiddenLine4);

  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-15;
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
    player.y = player.y+15;
  }

  if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.x = player.x+15;
  }
  if(keyDown("LEFT_ARROW")||touches.length>0){
    player.x = player.x-15;
  }

  if(keyWentDown("space")){ 
    player.addImage(shooter_shooting);
    spawnBullet();
  }

  else if(keyWentUp("space")){
    player.addImage(shooterImg);
  }
  if (frameCount % 80 === 0) {
    spawnZombies();
  }

  if(bulletGroup.collide(zombieGroup)){
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
  }

  drawSprites();
}

function spawnBullet() {
  bullet = createSprite(150, width/2, 50,20);
  bullet.y = player.y-25;
  bullet.x = player.x+53;
  bullet.addImage(bulletImg);
  bullet.scale=0.012;
  bullet.velocityX= 30;
  bullet.lifetime = 400;
  bulletGroup.add(bullet);
}

function spawnZombies(){
  zombie = createSprite(1370,random(500,780),40,40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.13;
  zombie.velocityX = -10;
  zombie.lifetime = 400;
  zombie.setCollider("rectangle",0,0,400,1000);
  zombieGroup.add(zombie);
}