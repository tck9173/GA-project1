console.log('up and running');

//Event listener for start round button
const newRoundButton = document.querySelector('.newRound')
newRoundButton.addEventListener('click', function() {
    console.log("Clicked start round button");
})

//Event listener for new game button
const newGameButton = document.querySelector('.newGame');
newGameButton.addEventListener('click', function() {
    console.log("Clicked new game button");
})


//Game logic
//Array to store sequence
//Sequence will be generated randomly

//Game Play
//after round is started, sequence starts and blinks the first glass
//player must click glass that just blinked
//if player clicks correct glass another glass is added to the array 
//new array is blinked

//Win logic
//If array length is 5 and player successfully completes round player wins
//Logic to add score if round is complete

//If player loses throw message or blink glasses red. 