var buttonColors = ["red", "green", "yellow", "blue"];
var level = 0;
var stringg = "";

$(document).keydown(function () {
  stringg = "";
  ++level;
  game(level);
});

function game(level) {
  var i = 0;
  function playSequence() {
    $("h1").text("Level " + level);
    if (i < level) {
      var randomNumber = Math.floor(Math.random() * 4);
      var desiredColor = buttonColors[randomNumber];
      stringg += desiredColor;
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

//mouse click
// function mouseClick(level) {
//   var colors = "";
//   for (var i = 0; i < level; i++) {
//     $(document).click(function (colorPressed) {
//       colors += colorPressed.target.id;
//       console.log("inside for " + colors);
//     });
//   }
//   console.log("out for " + colors);
//   return colors;
// }
// var akon = mouseClick(3);
// console.log(akon);


function mouseClick(level) {
  var colors = "";
  var clicks = 0;

  function handleClick(colorPressed) {
    colors += colorPressed.target.id;
    console.log("inside for " + colors);
    clicks++;
  }

  for (var i = 0; i < level; i++) {
    $(document).click(handleClick);
  }
  
  return colors;
}

var akon = mouseClick(3);
console.log('akon' + akon);
