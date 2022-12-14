// Arrays

var buttonColors = ["red", "orange", "yellow", "lightgreen", "green", "teal", "blue", "magenta", "purple"];

var gamePattern = [];

var userClickedPattern = [];

// Variables

var started = false;

var level = 0;

// Functions

function blink(name) {
    $("#" + name).addClass("pressed") 
    
    setTimeout(function() {
        $("#" + name).removeClass("pressed"); 
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play();
}

function gameStart() {
    $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                gameSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("#level-title").text("Game Over, Click Screen Again to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    setTimeout(function() {
        started = false;
    }, 1000);
}

// MAIN FUNCTIONS
// when anywhere on document is clicked, start the game (only the first click)

$(document).click(function() {
    if(!started) {
        gameStart();
        gameSequence();
        started = true;
    }
})

// game algorithm

function gameSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 9);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// user interaction function

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    blink(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})