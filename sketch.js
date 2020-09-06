//Create variables here
var dog, happyDog, hungryDog, database, foodS,foodStockRef,database;
var frameCountNow = 0;
var foodStock = 11;

function preload()
{
  //load images here
  hungryDog = loadImage("images/dogImg1.png");
  happyDog = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  
  dog = createSprite(width/2,height/2,10,10);
  dog.addAnimation("hungry",hungryDog);
  dog.addAnimation("happy",happyDog);
  dog.scale = 0.3;

  getFoodCount();
  updateFoodCount();
}

function draw() { 
  background(46, 139, 87);

  getFoodCount();
  console.log(foodStock);

  if(keyWentDown(UP_ARROW)){
    updateFoodCount();
    frameCountNow = frameCount;
  }

  if(frameCount - frameCountNow >= 600){
    dog.changeAnimation("hungry",hungryDog);
  }

  drawSprites();
  //add styles here
  textSize(32);
  fill("red");
  text("Amount of Food: "+foodStock,110,50);
  textSize(20);
  text("Press the up arrow key to feed the dog!",75,100);
}

function getFoodCount(){
  foodStockRef = database.ref('Food');
  foodStockRef.on("value",function(data){
    foodStock = data.val();
  })
}

function updateFoodCount(){
  if(foodStock >= 1){
    database.ref('/').update({
     Food: foodStock-1
    });
    dog.changeAnimation("happy",happyDog);
  }
  else {};
}