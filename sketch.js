var PLAY=1;
var END=0;
var gameState=1;

var sword,asteroid,alien,asteroidGroup,alienGroup, score,r, position;
var swordImage,asteroidImage,alienImage,gameOverImage;


function preload(){
  swordImage = loadImage("sword.png")
  alienImage = loadImage("alien.png")
  asteroidImage = loadImage("asteroid.png")
  gameOverImage = loadImage("gameover.png")
}


function setup() {
  createCanvas(600, 600);
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=.2

  sword.setCollider("rectangle",0,0,40,40);
  score=0;
  asteroidGroup=createGroup();
  alienGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
  
    asteroids();
    Alien();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    if(asteroidGroup.isTouching(sword)){
        asteroidGroup.destroyEach();
       score=score+2;

    }
    else{
      if(alienGroup.isTouching(sword)){
        gameState=END;
        
        
        asteroidGroup.destroyEach();
        alienGroup.destroyEach();
        asteroidGroup.setVelocityXEach(0);
        alienGroup.setVelocityXEach(0);
        
        sword.addImage(gameOverImage);
        sword.scale=2;
        sword.x=300;
        sword.y=300;
      }
    }
  }
  
  drawSprites();
  //Display score
  textSize(25);
  text   ("Score : "+ score,250,50);
}

function Alien(){
  if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20);
    alien.addImage( alienImage);
    alien.y=Math.round(random(100,550));
    alien.velocityX=-(8+(score/10));
    alien.setLifetime=50;
    
    alienGroup.add(alien);
  }
}

function asteroids(){
  if(World.frameCount%80===0){
    asteroid=createSprite(400,200,20,20);
    asteroid.addImage(asteroidImage)
  asteroid.velocityX= (7+(score/4));
    asteroid.scale=0.8;
    asteroid.y=Math.round(random(50,550));
    asteroid.setLifetime=100;
    asteroidGroup.add(asteroid);
  }
}