let glassArray = document.querySelectorAll('.glass');
const scoreDisplay = document.querySelector('#score');
const barDiv = document.querySelector('.bar');
const gameModeButton = document.querySelector('.gameMode');

let clickArray =[];
let roundCount = 1;
let sequenceArray = [];
let clickCount = 0;
let score = 0;

let maxRound = 5;
let maxScore = 5;
let gameStarted = false;
let glassCount = 3;
let glassIndex = 2;
let gameMode = "easy";

let balance = 100;
const balanceDisplay = document.querySelector('#balance');
const inputSubmitButton = document.querySelector('#formSubmit');-

updateScore();

let tipInput;

const newRoundButton = document.querySelector('.newRound')
newRoundButton.addEventListener('click', function() {
    gameStarted = true;
    createSequence();
    setTimeout(function() {blinkGlasses(0);},500);
})

const newGameButton = document.querySelector('.newGame');
newGameButton.addEventListener('click', function() {
    newGame();
})

inputSubmitButton.addEventListener('click', function(){
    event.preventDefault();
    inputSubmits();
})

gameModeButton.addEventListener('click', toggleGameMode);

function newGame(){
    clickArray = [];
    clickCount=0;
    roundCount=1;
    score=0;
    balance = 100;
    updateScore();
    gameStarted = false;
    while(glassArray.length>3){
        glassArray[1].remove();
        glassArray = document.querySelectorAll('.glass');
    }
}

function updateScore() {
    scoreDisplay.innerText = score;
    balanceDisplay.innerText = balance;
}

function createSequence(){
    for (let i=0; i<maxRound; i++) {
    sequenceArray[i] = Math.floor(Math.random()*glassArray.length);
    }
}

function resetGlasses() {
    for (let i=0; i<glassArray.length; i++){
        glassArray[i].classList.remove('blink');
        glassArray[i].classList.remove('red');
    }
}

function redGlasses() {
    for (let i=0; i<glassArray.length; i++){
        glassArray[i].classList.add('red');
    }
}

function blinkGlasses(i){
    glassArray[sequenceArray[i]].classList.add('blink');
    setTimeout(resetGlasses, 900);
}

function clicked(i) {
    glassArray[i].classList.add("clicked");
        setTimeout(function() {clickedRemove(i);}, 150);
        function clickedRemove(i) {
            glassArray[i].classList.remove('clicked');
        }
}

for (let i=0; i<glassArray.length; i++) {
    glassEventListener(i);
}

function glassEventListener(i) {
    glassArray[i].addEventListener('click', function(){
        clickArray[clickCount]=i;
        clicked(i);
        setTimeout(checkSequence,200);
    })
}

function getBlink(){
    let timer=1000;
    for (let i=0; i<= roundCount; i++){
        setTimeout(function() {blinkGlasses(i);},timer);
        timer +=1000;
    }
}

function roundComplete() {
    gameStarted=false;
    score++;
    clickCount=0;
    roundCount=1;
    if (balance >= 5) {
        if (score<=maxScore){
            balance -= 5;
            confirm("Alright, I will pour you another");
            if (gameMode === "hard" && !gameStarted){
                let newGlass = document.createElement('div');
                newGlass.classList.add('glass');
                barDiv.appendChild(newGlass);
                glassArray = document.querySelectorAll('.glass');
                glassCount = glassArray.length;
                glassIndex = glassCount - 1;
                glassEventListener(glassIndex);
            }
        } else {
            alert("You 'win' but I think thats enough for one night. Come back tomorrow.")
            newGame();
        }
    } else {
        alert("You do not have enough money! Please start a new game.")
        newGame();
    }
}

function checkSequence() {
    if (gameStarted) {
        if (clickArray[clickCount] === sequenceArray[clickCount]){
            console.log("correct");
            clickCount++;
            if (clickCount === roundCount){
                if (roundCount === maxRound){
                    roundComplete();
                    updateScore();
                } else {
                    getBlink();
                    clickCount = 0;
                    roundCount++; 
                }
            }
        } else {
            for (let i=500; i<=3000; i=i+500) {
                setTimeout(redGlasses, i);
                i+=500;
                setTimeout(resetGlasses, i);
            }
            setTimeout(getTip, 3100)
            
        }
    }
}

function getTip(){
    tipInput = prompt("You guessed incorrectly. Do you wish to try to convince the bartender to let you try again? Enter in your tip:")
    if (tipInput == null || tipInput =="") {
        setTimeout(function() {alert("Get out of here ya drunk!");}, 1000);
        newGame();
    } else if (tipInput >= 20 && tipInput <= balance) {
        balance = balance - tipInput;
        roundComplete();
        updateScore();
    } else if (tipInput < 20 && tipInput <= balance) {
        alert('You were not able to convince the bartender and got kicked out of the bar. Please start a new game.')
        newGame();
    } else if (tipInput > balance){
        alert('You do not have that much money so you got kicked out of the bar. Please start a new game.');
        newGame();
    }
}

function toggleGameMode() {
    if (gameModeButton.classList.contains('easyMode')){
        gameModeButton.classList.remove('easyMode');
        gameModeButton.classList.add('hardMode');
        gameModeButton.innerText = 'Hard Mode';
        gameMode = "hard";
    } else if(gameModeButton.classList.contains('hardMode')){
        gameModeButton.classList.remove('hardMode');
        gameModeButton.classList.add('easyMode');
        gameModeButton.innerText = "Easy Mode";
        gameMode = "easy";
    }
}

function inputSubmits() {
    let maxRoundInput = parseInt(document.querySelector('#maxRoundInput').value);
    let maxScoreInput = parseInt(document.querySelector('#maxScoreInput').value);
    if (maxRoundInput > 0){
        maxRound = maxRoundInput;
    }
    if (maxScoreInput >0){
        maxScore = maxScoreInput;
    }
}