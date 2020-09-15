//Query selectors
let glassArray = document.querySelectorAll('.glass');
const scoreDisplay = document.querySelector('#score');
const barDiv = document.querySelector('.bar');
const gameModeButton = document.querySelector('.gameMode');
const newGameButton = document.querySelector('.newGame');
const balanceDisplay = document.querySelector('#balance');
const inputSubmitButton = document.querySelector('#formSubmit');
const newRoundButton = document.querySelector('.newRound')

//Initialize all needed variables
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
let tipInput;
let requiredTip;

//Create board
updateScore();
for (let i=0; i<glassArray.length; i++) {
    glassEventListener(i);
}

//Event listeners for all buttons
newRoundButton.addEventListener('click', function() {
    gameStarted = true;
    createSequence();
    setTimeout(function() {blinkGlasses(0);},500);
})

newGameButton.addEventListener('click', function() {
    newGame();
})

inputSubmitButton.addEventListener('click', function(){
    event.preventDefault();
    inputSubmits();
})

gameModeButton.addEventListener('click', toggleGameMode);

//Function to reset several variables for a new game and reset game board if hard mode was selected
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

//Function to update score display and balance display
function updateScore() {
    scoreDisplay.innerText = score;
    balanceDisplay.innerText = balance;
}

//Function to create random sequence for use in game play
function createSequence(){
    requiredTip = Math.floor(Math.random() * balance);
    for (let i=0; i<maxRound; i++) {
    sequenceArray[i] = Math.floor(Math.random()*glassArray.length);
    }
}

//Function to return glasses to normal state 
function resetGlasses() {
    for (let i=0; i<glassArray.length; i++){
        glassArray[i].classList.remove('blink');
        glassArray[i].classList.remove('red');
    }
}

//Function to make glasses red
function redGlasses() {
    for (let i=0; i<glassArray.length; i++){
        glassArray[i].classList.add('red');
    }
}

//Function to make the called glass blink
function blinkGlasses(i){
    glassArray[sequenceArray[i]].classList.add('blink');
    setTimeout(resetGlasses, 900);
}

//Function to quickly bink a glass when clicked
function clicked(i) {
    glassArray[i].classList.add("clicked");
        setTimeout(function() {clickedRemove(i);}, 150);
        function clickedRemove(i) {
            glassArray[i].classList.remove('clicked');
        }
}

//Function to keep track of what glasses were clicked
function glassEventListener(i) {
    glassArray[i].addEventListener('click', function(){
        clickArray[clickCount]=i;
        clicked(i);
        setTimeout(checkSequence,200);
    })
}

//Function to blink glasses in sequence
function getBlink(){
    let timer=1000;
    for (let i=0; i<= roundCount; i++){
        setTimeout(function() {blinkGlasses(i);},timer);
        timer +=1000;
    }
}

//Function to complete round if user selects correct sequence
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

//Function to check if user selected the correct sequence
function checkSequence() {
    if (gameStarted) {
        if (clickArray[clickCount] === sequenceArray[clickCount]){
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

//Function to get a tip from user if user did not select correct sequence
function getTip(){
    tipInput = prompt("You guessed incorrectly. Do you wish to try to convince the bartender to let you try again? Enter in your tip:")
    if (tipInput == null || tipInput =="") {
        setTimeout(function() {alert("Get out of here ya drunk!");}, 1000);
        newGame();
    } else if (tipInput >= requiredTip && tipInput <= balance) {
        balance = balance - tipInput;
        roundComplete();
        updateScore();
    } else if (tipInput < requiredTip && tipInput <= balance) {
        alert('You were not able to convince the bartender and got kicked out of the bar. Please start a new game.')
        newGame();
    } else if (tipInput > balance){
        alert('You do not have that much money so you got kicked out of the bar. Please start a new game.');
        newGame();
    }
}

//Function to toggle game mode from hard to easy
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

//Function to change game options if submit is clicked
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