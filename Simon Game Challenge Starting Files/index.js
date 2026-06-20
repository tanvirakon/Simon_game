var buttonColors = ["red", "green", "yellow", "blue"];
var level = 0;
var stringg = "";
var originalColors = [];
var acceptingClicks = false;

$(document).keydown(function () {
  if (level == 0) {
    stringg = "";
    ++level;
    game(level);
  }
});

function game(level) {
  var i = 0;
  stringg = "";
  originalColors = [];
  acceptingClicks = false;

  function playSequence() {
    $("h1").text("Level " + level);
    if (i < level) {
      var randomNumber = Math.floor(Math.random() * 4);
      var desiredColor = buttonColors[randomNumber];
      stringg += desiredColor;
      originalColors.push(desiredColor);
      console.log(stringg, i);
      if (i == 0) {
        setTimeout(() => {
          button(desiredColor);
          i++;
          playSequence();
        }, 100);
      } else {
        setTimeout(() => {
          button(desiredColor);
          i++;
          playSequence(); // Call the function recursively for the next iteration
        }, 500);
      }
    } else {
      acceptingClicks = true;
      mouseClick(level);
    }
  }
  playSequence(); // Start the sequence
}

function button(desiredColor) {
  var classOfButton = "." + desiredColor;
  $(classOfButton).addClass("pressed");
  var audioName = "./sounds/" + desiredColor + ".mp3";
  var audio = new Audio(audioName);
  audio.play();
  setTimeout(() => {
    $(classOfButton).removeClass("pressed");
  }, 100);
}

// mouse click
function mouseClick(level) {
  var colors = "";
  var clicks = 0;

  $(".btn").off("click").click(function (colorPressed) {
    if (acceptingClicks == false) {
      return;
    }

    var desiredColor = colorPressed.target.id;
    colors += desiredColor;
    button(desiredColor);
    console.log("inside click " + colors);

    if (desiredColor != originalColors[clicks]) {
      gameOver();
      return;
    }

    clicks++;

    if (clicks == level) {
      acceptingClicks = false;
      $(".btn").off("click");
      setTimeout(() => {
        ++level;
        game(level);
      }, 700);
    }
  });
}

function gameOver() {
  acceptingClicks = false;
  $(".btn").off("click");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");

  var wrongAudio = new Audio("./sounds/wrong.mp3");
  wrongAudio.play();

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);

  level = 0;
  stringg = "";
  originalColors = [];
}
