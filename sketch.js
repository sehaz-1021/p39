var dog, happyDog, database, foodS, foodStock;
var feedPet,addPet;
var fedTime,lastFed;
var foodObj;
foodS=20;
function preload()
{
dogImg=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  console.log(database);

	createCanvas(1000,500);
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  dog=createSprite(800,350,50,50);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodObj= new Food();

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);





  
  foodObj.display();
  fedTime=database.ref('Feed Time');
fedTime.on("value",function(data){
  lastFed=data.val();
})

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+lastFed%12 + "PM",350,30)
}
else if(lastFed==0){
  text("lastFeed : 12 AM",350,30);
  }
else{
 text("Last Feed : "+lastFed+"AM",350,30)
}



drawSprites();




  
  //add styles here

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  }
  

  


function feedDog(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

function addFoods(){
  foodS++;

database.ref('/').update({
  Food:foodS
})

}

