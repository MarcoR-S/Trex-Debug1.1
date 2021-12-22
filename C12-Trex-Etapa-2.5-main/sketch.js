var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem, nuvemImg, grupoNuvens;
var obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6, grupoObstaculos;
var PLAY = 1, END = 0;
var gameState = PLAY;
var gameOverImg, restartImg;
var Game, Rest;


var score = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  nuvemImg = loadImage("cloud.png");

  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage ("restart.png");
}

function setup() {

  createCanvas(600,200)
  

  grupoObstaculos = createGroup();
  grupoNuvens = createGroup();

  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)
  trex.debug = true;
  trex.setCollider("circle",0,0,50);

 Game = createSprite(300,100);
 Game.addImage(gameOverImg);
 Game.scale = 1.2
 

 Rest = createSprite(300,140);
 Rest.addImage(restartImg);
 Rest.scale = 0.5;

}

function draw() {
  //definir cor do plano de fundo
  background(180);
  


  //console.log(trex.y)
  
  text("PONTUAÇÃO: "+score,475,20); 
 
  
  if(gameState == PLAY){
    ground.velocityX = -4;
    Game.visible = false;
    Rest.visible = false;
    score = score+round(frameCount/60)
  // pulando o trex ao pressionar a tecla de espaço
    if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 1
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(grupoObstaculos.isTouching(trex)){
      gameState = END;
      
      
    }
    criarNuvens();
    criarObstaculos();


  }else if(gameState == END){
    ground.velocityX = 0;
    grupoObstaculos.setVelocityXEach(0);
    grupoNuvens.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    trex.velocityY = 0;
    grupoObstaculos.setLifetimeEach(-1);
    grupoNuvens.setLifetimeEach(-1);
    Game.visible = true;
    Rest.visible = true;


  }

 
  
  
  
 
  
  //impedir que o trex caia
  trex.collide(invisibleGround);
  
  //Gerar Nuvens

  drawSprites();
}

//função para gerar as nuvens
function criarNuvens(){
 //escreva seu código aqui
  if(frameCount%60 == 0){
    nuvem = createSprite(600,100,40,10);
    nuvem.velocityX = -3;
    nuvem.addImage(nuvemImg);
    nuvem.scale = 0.5
    nuvem.y = random(20,100);
    nuvem.lifetime = 220;
    trex.depth = nuvem.depth+1

    grupoNuvens.add(nuvem);
  }
 
}

function criarObstaculos(){
  if(frameCount%60 == 0){
    var obstaculo = createSprite(400,165,10,40);
    obstaculo.velocityX = -6;
    var rand = round(random(1,6));
    switch(rand){
      case 1: obstaculo.addImage(obstaculo1);
      break;

      case 2: obstaculo.addImage(obstaculo2);
      break;

      case 3: obstaculo.addImage(obstaculo3);
      break;

      case 4: obstaculo.addImage(obstaculo4);
      break;

      case 5: obstaculo.addImage(obstaculo5);
      break;

      case 6: obstaculo.addImage(obstaculo6);
      break;

      default: break;

    }

    obstaculo.scale = 0.6;
    obstaculo.lifetime = 100;

    grupoObstaculos.add(obstaculo);
  }
}

