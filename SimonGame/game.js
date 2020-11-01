var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern;

function gameInit() {
  state = "init";
  level = 0;
  gamePattern = [];
}

function makeSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonPress($("#" + randomChosenColor));
  makeSound(randomChosenColor);
}

function nextLevel() {
  level ++;
  nextSequence();
  currentPatternIndex = 0;
  $("#level-title").text("Level " + level);
  console.log("level: " + level + " game pattern: " + gamePattern);
}

function buttonPress(button) {
  $(button).addClass("pressed");
  setTimeout(function() {
    $(button).removeClass("pressed");
  }, 100);
  makeSound($(button).attr("id"));
}

function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 10);
  makeSound("wrong");

  state = "over";
  level = 0;
  gamePattern = [];
  console.log("game over");
}

gameInit();

$(document).keydown(function() {
  if ((state == "init") || (state == "over")) {
      nextLevel();
      state = "start"
      currentPatternIndex = 0;
  }
})

$(".btn").click(function() {
  buttonPress(this);
  if (state == "start") {
    if (currentPatternIndex < level) {
      if ($(this).attr("id") == gamePattern[currentPatternIndex]) {
        currentPatternIndex ++; // check next key
        if (currentPatternIndex == level)
          // The last correct button is pressed for the current level.
          // Let's go to the next Level.
          setTimeout(nextLevel, 500);
      }
      else
        gameOver();
    }
  }
  else
      gameOver();
})
