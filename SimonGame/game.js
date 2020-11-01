var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern;

function gameInit() {
  state = "init";
  level = 0;
  gamePattern = [];
}

function makeSound(sound) {
  let audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  makeSound(randomChosenColor);
  console.log(level, gamePattern);
}

function nextLevel() {
  level ++;
  nextSequence();
  currentPatternIndex = 0;
  $("#level-title").text("Level " + level);
  console.log("level: " + level + " game pattern: " + gamePattern);
}

function buttonPress(button) {
  button.classList.add("pressed");
  setTimeout(function() {
    button.classList.remove("pressed");
  }, 10);
  makeSound(button.classList[1]);
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
  if (state == "start") {
    if (currentPatternIndex < level) {
      buttonPress(this);
      if (this.classList.contains(gamePattern[currentPatternIndex])) {
        currentPatternIndex ++; // check next key
        if (currentPatternIndex == level)
          // The last correct button is pressed for the current level.
          // Let's go to the next Level.
          setTimeout(nextLevel, 500);
      }
      else {
        gameOver();
        return;
      }
    }
  }
  else
  {
      buttonPress(this);
      gameOver();
  }
})
