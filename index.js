var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;

var level=0;

$(document).keypress(function(){

    if(!started)
    {
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {

        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{

        playsound("wrong");
        $("body").addClass("game-over");

        $("#level-title").text("game over!!press a key to restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

       
        startOver();
    }
}
function nextSequence() {

    userClickedPattern=[];
    level++;

    $("#level-title").text("level "+level);

    var randomNumber= Math.floor(Math.random()*4); 
    var randomChosenColour=buttonColours[randomNumber];  
    gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

}
function playsound(name) {
    

var audio=new Audio("sounds/"+name+".mp3");
audio.play();

}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
    
}

function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }