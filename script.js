const glassArray = document.querySelectorAll('.glass');
const scoreDisplay = document.querySelector('#score');

let clickArray =[];
let roundCount = 1;
let sequenceArray = [];
let clickCount = 0;
let score = 0;
updateScore();
const maxRound = 5;
let gameStarted = false;

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

function checkSequence() {
    if (gameStarted) {
        if (clickArray[clickCount] === sequenceArray[clickCount]){
            console.log("correct");
            clickCount++;
            if (clickCount === roundCount){
                if (roundCount === maxRound){
                    confirm("Alright, I will pour you another");
                    gameStarted=false;
                    score++;
                    clickCount=0;
                    roundCount=1;
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