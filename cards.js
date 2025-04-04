"use strict";

let moves = 0;
let matches = 0;
let timer;
let timeElapsed = 0;
let gameStarted = false;
const totalPairs = 8;
const timeLimit= 60;

const cardList =[
    "littleblackwidow",
    "littleblackwidow",
    "littlehulk",
    "littlehulk",
    "littleironman",
    "littleironman",
    "littleloki",
    "littleloki",
    "littlepanther",
    "littlepanther",
    "littlespidy",
    "littlespidy",
    "littlecaptain",
    "littlecaptain",
    "littlethor",
    "littlethor"
];


//To Shuffle Cards...
function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        [array[i],array[j]] = [array[j] , array[i]];
    }
}
shuffle(cardList);

//creating the board
const board = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let lockboard = false;


//timer
function startTimer(){
    timeElapsed=timeLimit;
    document.getElementById("timer").innerHTML=`Timer: ${timeElapsed}s`;

    timer=setInterval(()=>{
        timeElapsed--;
        document.getElementById("timer").innerHTML = `Timer: ${timeElapsed}s`;
   
    if(timeElapsed <=0){
        clearInterval(timer);
        ShowPopup("You LOST!","red");
    }
},1000);
}

cardList.forEach((photo)=>{
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.photo = photo ;
    
    const img = document.createElement("img");
    img.src = `${photo}.jpg`;
    img.style.display = "none";
    card.appendChild(img);

    const logo = document.createElement("img");
    logo.src = "logo.jpg";
    logo.classList.add("logo");
    card.appendChild(logo);
    
    card.innerHTML = `
    <div class="card-inner">
        <div class="card-front">
            <img src="Alogo.jpg" class="logo">
        </div>
        <div class="card-back">
            <img src="${photo}.jpg">
        </div>
    </div>
`;

    //Clicking logic
    card.addEventListener("click", ()=> {
        if(lockboard || card === firstCard)return;

        if (!gameStarted) {
            gameStarted = true;
            startTimer();
        }

        card.classList.add("flip");
    
        if(!firstCard){
            firstCard= card;
            return;
        }

        secondCard =card;
        lockboard= true;

        document.getElementById("moves").innerHTML= `Moves: ${++moves}`;

        //flipping logic
        if(firstCard.dataset.photo === secondCard.dataset.photo){
            matches++;
            firstCard= null;
            secondCard = null;
            lockboard = false;

            if(matches=== totalPairs){
                clearInterval(timer);
                ShowPopup("Congratulations! You Won" , "green");
            }

        }else{
            setTimeout(()=>{
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                firstCard = null;
                secondCard = null;
                lockboard = false;
            }, 1000);
        }
});

    board.appendChild(card);

});

function ShowPopup(message , color){
    let popup = document.createElement("div");
    popup.innerText = message;
    popup.style.position = "fixed";
    popup.style.top="50%";
    popup.style.left ="50%";
    popup.style.transform = "translate(-50% , -50%)";
    popup.style.background = color;
    popup.style.color="white";
    popup.style.padding ="20px";
    popup.style.borderRadius ="10px";
    document.body.appendChild(popup);
}

document.getElementById("reset").addEventListener("click" , restart);

function restart() {
    clearInterval(timer);
    timeElapsed = timeLimit;
    moves = 0;
    matches = 0;
    gameStarted = false;
    firstCard = null;
    secondCard = null;
    lockboard = false;

    document.getElementById("moves").innerText = moves;
    document.getElementById("timer").innerText = `Timer: ${timeElapsed}`;

    shuffle(cardList);

    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.dataset.photo = cardList[index];

        const backImg = card.querySelector(".card-back img");
        backImg.src = `${cardList[index]}.jpg`;
       
        card.classList.remove("flip");
    });

    const popup = document.querySelector("div[style*='position: fixed']");
    if (popup) popup.remove();
}