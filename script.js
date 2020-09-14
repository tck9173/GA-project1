let glassArray = document.querySelectorAll('.glass');
const scoreDisplay = document.querySelector('#score');
const barDiv = document.querySelector('.bar');

let clickArray =[];
let roundCount = 1;
let sequenceArray = [];
let clickCount = 0;
let score = 0;
updateScore();
let maxRound = 3;
let maxScore = 5;
let gameStarted = false;
let glassCount = 3;
let glassIndex = 2;
let gameMode = "easy";

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

function newGame(){
    clickArray = [];
    clickCount=0;
    roundCount=1;
    score=0;
    updateScore();
    gameStarted = false;
    while(glassArray.length>3){
        glassArray[1].remove();
        glassArray = document.querySelectorAll('.glass');
    }
}

function updateScore() {
    scoreDisplay.innerText = score;
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
        //console.log(`Click count: ${clickCount} Round count: ${roundCount}`);
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
    if (score<=maxScore){
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
        alert("I think thats enough for one night. Come back tomorrow.")
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
            setTimeout(function() {alert("Get out of here ya drunk!");}, 3100);
            newGame();
        }
    }
}

gameModeButton = document.querySelector('.gameMode');

gameModeButton.addEventListener('click', function(){
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
})

const inputSubmitButton = document.querySelector('#formSubmit');

inputSubmitButton.addEventListener('click', function(){
    event.preventDefault();
    maxRound = parseInt(document.querySelector('#maxRoundInput').value);
    maxScore = parseInt(document.querySelector('#maxScoreInput').value);
})