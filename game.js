var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

$(document).keypress(function(){
    if (!gameStart) {

        console.log("key press detected");

        gameStart = true;
        nextSequence();
    }
});

function nextSequence() {
    level += 1;
    userClickedPattern = [];
    $("#level-title").text("Level "+level);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    blink(randomChosenColour);
    playSound(randomChosenColour);

    console.log("nextSequence() executed.");
    console.log("game pattern:"+gamePattern);
    console.log("user clicked pattern:"+userClickedPattern);
    console.log("level:"+level); 
}


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    console.log("gamePlay() executing.");
    console.log("user clicked pattern:"+userClickedPattern);
        
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(x) {

    console.log("checkAnswer() started.");

    if (gamePattern[x]===userClickedPattern[x]) {

        console.log("gamePattern["+x+"]===userClickedPattern["+x+"]");

        if (gamePattern.length===userClickedPattern.length) {
            
            console.log("gamePattern.length (i.e. "+gamePattern.length+")===userClickedPattern.length (i.e. "+userClickedPattern.length+")");

            setTimeout(function() {
                nextSequence();
            },1000);

        }
    }
    else {

        console.log("gamePattern["+x+"]!==userClickedPattern["+x+"]");

        var soundWrong = new Audio("./sounds/wrong.mp3");
        soundWrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

        console.log("game pattern:"+gamePattern);
        console.log("user clicked pattern:"+userClickedPattern);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}








function blink(x) {
    $("#"+x).css("visibility","hidden");
    setTimeout(function(){
        $("#"+x).css("visibility","visible");
    },100);

    console.log("blink() executed.");
}

function playSound(x) {
    switch (x) {
        case "green":
            var soundGreen = new Audio("./sounds/green.mp3");
            soundGreen.play(); 
        break;
        case "red":
            var soundRed = new Audio("./sounds/red.mp3");
            soundRed.play(); 
        break;
        case "yellow":
            var soundYellow = new Audio("./sounds/yellow.mp3"); 
            soundYellow.play();
        break;
        case "blue":
            var soundBlue = new Audio("./sounds/blue.mp3");
            soundBlue.play(); 
        break;
        default:
    }

    console.log("playSound() executed.");
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

    console.log("animatePress() executed.");
}