console.log('up and running');
let sequenceArray = [];
let clickCount = 0;
const glassArray = document.querySelectorAll('.glass');
let clickArray =[];
let roundCount = 1;


//Event listener for start round button
const newRoundButton = document.querySelector('.newRound')
newRoundButton.addEventListener('click', function() {
    console.log("Clicked start round button");
    createSequence();
    //blinkGlasses();
})

//Event listener for new game button
const newGameButton = document.querySelector('.newGame');
newGameButton.addEventListener('click', function() {
    console.log("Clicked new game button");
    clickArray = [];
    clickCount=0;
})


//Game logic
//Array to store sequence
//Sequence will be generated randomly
function createSequence(){
    for (let i=0; i<5; i++) {
    sequenceArray[i] = Math.floor(Math.random()*glassArray.length);
    }
    console.table(sequenceArray);
}

function resetGlasses() {
    for (let i=0; i<glassArray.length; i++){
        glassArray[i].classList.remove('blink');
    }
}

//Game Play
//after round is started, sequence starts and blinks the first glass

// function blinkGlasses(){
//     for (let i=0; i<=roundCount; i++) {
//         glassArray[sequenceArray[i]].classList.add('blink');
//         setTimeout(resetGlasses, 1500);
//     }
// }

//player must click glass that just blinked
for (let i=0; i<glassArray.length; i++) {
    glassArray[i].addEventListener('click', function(){
        clickArray[clickCount]=i;
        console.log(`Click count: ${clickCount} Round count: ${roundCount}`);
        checkSequence();
        console.log(`Click count: ${clickCount} Round count: ${roundCount}`);
        //setTimeout(blinkGlasses, 1500);
    })
}
//if player clicks correct glass another glass is added to the array
function checkSequence() {
    if (clickArray[clickCount] === sequenceArray[clickCount]){
        console.log("correct");
        clickCount++;
        if (clickCount === roundCount){
            clickCount = 0;
            roundCount++;
        }
    } else {
        console.log("please try again");
    }
}
//new array is blinked

//Win logic
//If array length is 5 and player successfully completes round player wins
//Logic to add score if round is complete

//If player loses throw message or blink glasses red. 