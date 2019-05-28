//define all the variables needed 
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// here we search for keystrokes using JQuery and change the title from opening to the start of the game depending on !started
// we then run next sequence to begin the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//this searches for the users button clicks, creates the array for the user and animates, sound etc
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


 // this checks if the user array and game array match and includes the next sequence if they do and the game over if they dont. this
 // is structured as an if statement so that if its the right pattern on the last array index, you call next sequence and carry on,
 // if its the right pattern but not the last array it knows not to call next sequence as oure still playing in the middle off a pattern!
 //else its game over
 // includes the game over animation and the call to reset the level and game pattern in the reset function etc.

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// this is the body of the game propogating the pattern, user array is reset so that they can try each level, level increments, title matches,
// a random color button is generated and added to the game pattern array to check against the users
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // this is the animation for the new random new button presses 
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
// this is the animation for the user clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// audio
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// if fails then the resets are there so that the game can start again
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}