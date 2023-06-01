//variables of the game
let snakeVelocity = { x: 0, y: 0 };
const foodsound = new Audio("../music/food.mp3");
const gameoversound = new Audio("../music/gameover.mp3");
const movesound = new Audio("../music/move.mp3");
const musicsound = new Audio("../music/levitating.mp3");
let speed = 10;
let lastpainttime = 0;
let score = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 13, y: 3 };

//Funtions of the game
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = ctime;
  gameEngine();
}
function isCollide(k) {
    //when the snake bites itself
    for(let i=1;i<snakeArr.length;i++)
    {
        if(k[0].x===k[i].x && k[0].y===k[i].y)
        {
            return true;
        }
    }
    if(k[0].x>18 || k[0].x<0||k[0].y>18 || k[0].y<0)
    {
        return true;
    }

}


function gameEngine() {
  //Part 1: updating the location of snake parts and food
  if (isCollide(snakeArr)) {
    gameoversound.play();
    musicsound.pause();
    snakeVelocity = { x: 0, y: 0 };
    alert("GameOver! Press a button to Start the Game again");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }
  
  //If the sanke has eaten the food, the score has to be incremented and the food is to be regenerated
  if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
    foodsound.play();
    score=score+1;
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscorebox.innerHTML = "HiScore: " + hiscoreval;
    }
    scorebox.innerHTML="Score: "+score;
    snakeArr.unshift({ x: snakeArr[0].x + snakeVelocity.x,y: snakeArr[0].y + snakeVelocity.y  });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random())
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += snakeVelocity.x;
  snakeArr[0].y += snakeVelocity.y;

  //Part 2:Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } 
    else
    {
      snakeElement.classList.add("snake");
    } 
    board.appendChild(snakeElement);
  });
  //Part 3: Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main logic of the program

let hiscore=localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="Highscore: " +hiscore; 
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  snakeVelocity = { x: 0, y: 1 }; //start the game
  movesound.play();
  if(a%2==0)
    {
        musicsound.play();
    }

  switch (e.key) {

    case "ArrowUp":
      console.log("ArrowUp");
      snakeVelocity.x = 0;
      snakeVelocity.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      snakeVelocity.x = 0;
      snakeVelocity.y = 1;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      snakeVelocity.x = 1;
      snakeVelocity.y = 0;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      snakeVelocity.x = -1;
      snakeVelocity.y = 0;
      break;
  }
});
function hide()
{
    let k=document.getElementById("start");
    k.style.display="none";
}
let a=0;
function switchmusic()
{
    a++;
    if(a%2==1)
    {
        musicsound.pause();
    }
    else{
        musicsound.play();
    }
}
 