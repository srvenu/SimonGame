// Variables to store game state
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start game on "A" key press
$(document).keypress(function (event) {
    if (!started && event.key.toLowerCase() === "a") {
        startGame();
    }
});

// Function to start the game
function startGame() {
    level = 0;
    gamePattern = [];
    started = true;
    nextSequence();
}

// Function to generate the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

// Handle user button clicks
$(".btn").click(function () {
    if (!started) return; // Ignore clicks if game hasn't started

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

// Function to check user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

// Function to handle game over
function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    $("#level-title").text("Game Over! Press 'A' to Restart");
    started = false;
}

// Function to play sound
function playSound(name) {
    var audio = new Audio("sounds"+name + ".mp3");
    audio.play();
}

// Function to animate button press
function animatePress(colour) {
    $("#" + colour).addClass("pressed");
    setTimeout(() => $("#" + colour).removeClass("pressed"), 100);
}
