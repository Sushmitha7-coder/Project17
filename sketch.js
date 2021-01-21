var path,mainCyclist,bellSound;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var cycleBell,pinkCG,yellowCG,redCG;
var opp1,opp2,opp3,opp1I,opp2I,opp3I,opp1Img,opp2,opp2Img,opp3,opp3Img,gameover,gameoverI;

function preload(){
  pathImg = loadImage("images/Road.png");
  
  mainRacerImg1 =           loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  opp1Img=loadAnimation("opponent1.png","opponent2.png");
  opp1I=loadImage("opponent3.png");
  opp2Img=loadAnimation("opponent7.png","opponent8.png");
  opp2I=loadImage("opponent9.png");
  opp3Img=loadAnimation("opponent4.png","opponent5.png");
  opp3I=loadImage("opponent6.png");
  
  gameoverI=loadImage("gameOver.png");
  
  bellSound=loadSound("sound/bell.mp3")
}

function setup(){
  
createCanvas(1200,300);
  
  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  

  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;

  gameover=createSprite(650,150);
  gameover.addImage(gameoverI);
  gameover.scale = 0.8;
  gameover.visible = false;
  
  edges= createEdgeSprites();
  
  pinkCG=new Group();
  yellowCG=new Group();
  redCG=new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  
  text("Distance: "+ distance,350,30);
  
  
  
  if(gameState===PLAY){
    distance=distance+Math.round(getFrameRate()/50)
    
    path.velocityX = -(6+2*distance/150);
    
    mainCyclist.y = World.mouseY;
  
  
    mainCyclist .collide(edges);
    
    if(keyDown("space")){
      bellSound.play();
    }
  
    var r = Math.round(random(1,3));
    if(frameCount % 150 === 0){
    if(r===1){
       prinkC()
     }
      else if(r===2){
       redC(); 
      }
      else{
        yellowC();
      }
    }
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    if(pinkCG.isTouching(mainCyclist)){
      gameState=END;
       opp1.velocityY = 0;
      opp1.addAnimation("opponentPlayer1",opp1I);
    }
    if(redCG.isTouching(mainCyclist)){
      gameState=END;
       opp2.velocityY = 0;
      opp2.addAnimation("opponentPlayer2",opp2I);
    }
    if(yellowCG.isTouching(mainCyclist)){
      gameState=END;
       opp3.velocityY = 0;
      opp3.addAnimation("opponentPlayer3",opp3I);
    }
 }
  else if (gameState === END) {
    gameover.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function prinkC(){
  opp1=createSprite(1100,Math.round(random(50,250)),10,10);
  opp1.addAnimation("opponentPlayer1",opp1Img);
  opp1.velocityX=-(6+2*distance/150);
  opp1.scale=0.06;
  opp1.setLifetime=170;
  pinkCG.add(opp1);
}

function redC(){
  opp2=createSprite(1100,Math.round(random(50,250)),10,10);
  opp2.addAnimation("opponentPlayer2",opp2Img);
  opp2.velocityX=-(6+2*distance/150);
  opp2.scale=0.06;
  opp2.setLifetime=170;
  redCG.add(opp2);
}


function yellowC(){
  opp3=createSprite(1100,Math.round(random(50,250)),10,10);
  opp3.addAnimation("opponentPlayer3",opp3Img);
  opp3.velocityX=-(6+2*distance/150);
  opp3.scale=0.06;
  opp3.setLifetime=170;
  redCG.add(opp3);
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}