# GA-project1

Title: Beat the Bartender 

Description: So you think you need another drink? Not so fast. First you need to pass this test...

This is the classic Simon game but with a twist. The game starts with three glasses for the first round. The bartender will point to a glass and you have to remember which glass they pointed to. Each round you have to repeat the sequence starting with one glass working up to five. If you successfully remember the full sequence of five you are allowed another drink (Hard mode: BUT another glass is added to the game board for the next round. You are allowed more drinks as long as you can remember the sequence.) If you do not remember the sequence you are kicked out of the bar!

Remember to tip your bartenders. 

Wireframes:

![wireframe](https://i.imgur.com/Nvlt0Sn.png) 

Screenshot:

![screenshot](https://i.imgur.com/wWJlxba.png)

MVP: 

Bronze)

-Basic Simon Functionality

-Game keeps score

-Basic game controls: start round and new game

-Instructions page

Silver)

-Ability to enter game options

-Hard mode and easy mode

Gold)

-Ability to bribe bartender to avoid losing

Technologies used:

-VS Code to edit and create HTML, CSS, and JavaScript files.

-iTerm to create and manage files, and manage git workflow

Languages used: 

-JavaScript for all game logic, including DOM manipulation

Approach taken:

I broke this project down into the smallest possible functionality "blocks". The first functionality I needed was basic gameplay, but to do that I needed a game board. After the gameboard was created I needed a random sequence to follow. I also needed a way to check if the button clicked matched the random sequence. 

I continued through this project by adding small bits of functionality one at a time until I had a completed project. Something that I did throughout this project was "fake" the gameplay before I had the logic coded. I would console.log variables to ensure functions were working properly before incorporating them into the game. 

Installation instructions:

No installation is needed. Simply follow the link below to access the game through github pages:

https://tck9173.github.io/GA-project1/

Unsolved problems:

This game is fully functional with the advertised functionality. That is not to say they game does not have bugs or issues present. If the user attempts to break the game by clicking too many buttons while the game is still performing background actions there may be unexpected consequences. 

Future additions and updates:

As with almost any other game I am sure the styling can be updated on this game. I attempted to use a darker theme to make it look like a bar. In future updates I may update the styling to make it feel even more realistic.

The score and money left does not carry over after the page is refreshed or closed and reopened. This is planned for a future update. 