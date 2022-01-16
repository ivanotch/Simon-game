

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

var level = 0;



$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});


  $(".btn").click(function () {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

  })


function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  $("#"+ randomChosenColour).click(function() {
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
  })

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
}
