var PLAY = 1;
var END = 0;
var gameState = PLAY;
var path, boy, cash, diamonds, jwellery, sword, gameOver, SahilRunning;
var
  pathImage, boyImage, cashImage, diamondsImage, jwelleryImage, swordImage, gameOverImage;
var treasure = 0;
var cashG, diamondsG, jwelleryG, swordG;

function preload() {
  pathImage = loadImage("Road.png");
  boyImage = loadAnimation("runner1.png", "runner2.png");
  cashImage = loadImage("cash.png");
  diamondsImage = loadImage("diamonds.png");
  jwelleryImage = loadImage("jwell.png");
  swordImage = loadImage("sword.png");
  gameOverImage = loadImage("gameOver.png")
}

function setup() {

  createCanvas(400, 400);

  path = createSprite(200, 200);
  path.addImage(pathImage);
  path.velocityY = 4;

  boy = createSprite(70, 330, 20, 20);
  boy.addAnimation("SahilRunning", boyImage);
  boy.scale = 0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordG = new Group();

}

function draw() {

  boy.setCollider("rectangle", 0, 0, 800, 800);
  boy.debug = false;

  if (gameState === PLAY) {
  background(0);
  boy.x = World.mouseX;

  edges = createEdgeSprites();
  boy.collide(edges);

  if (path.y > 400) {
    path.y = height / 2;
  }

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasure = treasure + 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasure = treasure + 50;
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasure = treasure + 50;
    } else {
      if (swordG.isTouching(boy)) {
        swordG.destroyEach();
        gameState = 0;
      }
    }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

  } else if (gameState === 0) {
    
 boy.addAnimation("SahilRunning",gameOverImage);
    boy.x= 200;
    boy.y = 200;
    boy.scale = 1;
    
    cashG.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    swordG.destroyEach();

    path.velocityY = 0;
  }

  console.log("the gameState is " + gameState)
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasure, 150, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImage);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImage);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImage);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImage);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordG.add(sword);
  }
}