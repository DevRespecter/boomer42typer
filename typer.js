

window.addEventListener("load", init);
// Difficulty levels 
const levels = {
    easy: 10,
    medium: 7,
    hard: 5
}
const currentLevel = levels.easy;
// global vars 
let time = currentLevel;

let score = 0;

// state of game, if started or not 
let isPlaying;

// DOM variables -> ELs 
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");

const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");

const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

const difficulty = document.querySelector("#difficulty");


const words = [
    "stuff",
    "try out a sentence",
    "clock",
    "siblings",
    "magic",
    "definition",
    "stubborn",
    "generate",
    "zoomer",
    "space marine",
    "memetics",
    "try out a sentence",
    "fully automated",
    "a few words",
    "players club",
    "class list"
]

function init() {
    console.log("WE HERE");
    console.log("score:", score);

    // show number of seconds, similar to checkDifficulty
    seconds.innerHTML = currentLevel;

    // load word from array so boomer (or anyone) can type it
    // ::CALL showWord(words)
    showWord(words);

    // Begin Matching word input 
    wordInput.addEventListener("input", startMatch)

    // ::CALL countdown every second to time our based boomer 
    setInterval(countdown, 1000);

    // Check game status , checkStatus = 50 milliseconds 
    setInterval(checkStatus, 50);



}

// checking our typers input against words in array 
function startMatch() {

    // is going to return a true or false to be used in our game state isPlaying:
    if (matchWords()) {
        // for testing matches on words 
        console.log("MATCH!");
        // if there is match set isPlaying to true
        isPlaying = true;
        // set the time to one above the inital time to account for page load
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = "";
        score++

    }
    // if score is -1 , display 0 (to initialize the game)
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
    console.log(score);

}
// match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = "CORRECT!!";
        message.className += " text-success";
        return true;
    } else {
        message.className += " text-success";
        message.innerHTML = "typing...";
        return false;
    }

}
function showWord(words) {
    console.log(words.length);

    // Generate random array index from [words] array words.length
    const randomIndex = Math.floor(Math.random() * words.length);

    currentWord.innerHTML = words[randomIndex];
}

function countdown() {
    // make sure the time has not run out already

    if (time > 0) {
        // decrement for countdown
        time--;
    } else if (time === 0) {
        isPlaying = false;
    }
    // show time 
    // timeDisplay.innerHTML = "";
    timeDisplay.innerHTML = `${time}:sec`;
}

function checkStatus() {
    // WARNING: this function will keep executing (infinite loop) if certain commands like log are used 
    if (!isPlaying && time === 0) {
        message.innerHTML = "GAME OVER!!!";

        message.className += " text-warning";

        // adjusting for time and score because of how game restarts
        score = -1;

    }

    if (currentLevel >= 5) {

        return difficulty.innerHTML = "Game mode: Easy";
    } else {

        return difficulty.innerHTML = "Game mode: Hard";
    }




}

function scoreLogger(score) {
    console.log(score);
}
scoreLogger()

