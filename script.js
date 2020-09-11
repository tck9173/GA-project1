let sequenceArray = [];
let clickCount = 0;
const glassArray = document.querySelectorAll('.glass');
let clickArray =[];
let roundCount = 1;
const scoreDisplay = document.querySelector('#score');
let score = 0;
scoreDisplay.innerText = score;
const maxRound = 3;

//Event listener for start round button
const newRoundButton = document.querySelector('.newRound')
newRoundButton.addEventListener('click', function() {
    createSequence();
    setTimeout(function() {blinkGlasses(0);},500);
})

//Event listener for new game button
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
}

function updateScore() {
    scoreDisplay.innerText = score;
}

//Game logic
//Array to store sequence
//Sequence will be generated randomly
function createSequence(){
    for (let i=0; i<maxRound; i++) {
    sequenceArray[i] = Math.floor(Math.random()*glassArray.length);
    }
    //console.table(sequenceArray);
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

//Game Play
//after round is started, sequence starts and blinks the first glass

//player must click glass that just blinked
for (let i=0; i<glassArray.length; i++) {
    glassArray[i].addEventListener('click', function(){
        clickArray[clickCount]=i;
        //console.log(`Click count: ${clickCount} Round count: ${roundCount}`);
        checkSequence();
        
    })
}


function getBlink(){
    if (roundCount === 1){
        setTimeout(function() {blinkGlasses(0);},1000);
        setTimeout(function() {blinkGlasses(1);},2000);
    } else if (roundCount === 2) {
        setTimeout(function() {blinkGlasses(0);},1000);
        setTimeout(function() {blinkGlasses(1);},2000);
        setTimeout(function() {blinkGlasses(2);},3000);
    } 
}




function checkSequence() {
    if (clickArray[clickCount] === sequenceArray[clickCount]){
        console.log("correct");
        clickCount++;
        if (clickCount === roundCount){
            if (roundCount === maxRound){
                confirm("Alright, I will pour you another");
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