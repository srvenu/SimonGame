var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start game on click (works for both desktop & mobile)
$(document).on("click", function () {
    if (!started) {
        console.log("Game started!");  // Debugging
        startGame();
    }
});

function startGame() {
    level = 0;
    gamePattern = [];
    started = true;
    nextSequence();
}

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

// Handle user button clicks (for mobile & desktop)
$(".btn").on("click", function () {
    if (!started) return;

    var userChosenColour = $(this).attr("id");
    console.log("Button clicked:", userChosenColour); // Debugging

    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    $("#level-title").text("Game Over! Tap Anywhere to Restart");
    started = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(colour) {
    $("#" + colour).addClass("pressed");
    setTimeout(() => $("#" + colour).removeClass("pressed"), 100);
}
