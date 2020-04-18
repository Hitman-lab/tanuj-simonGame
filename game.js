let buttonColurs = ['red','blue','green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
var level = 0;
let started = false;

// Game starts here
$(document).keypress(function() {
    if(!started){
        $('#level-title').text('Level ' + level); // Once the game has started make H1 as Level - 0
        nextSequence();
        started = true;
    }
});

$('.btns').click(function () {
    // store the ID of the button tha got clicked
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);  
    animationPress(userChosenColour); 
    checkAnswer(userClickedPattern.length - 1); 
});

function nextSequence() {
    
    // ready for the next level match
    userClickedPattern = [];
    
    level++;
    $('#level-title').text('Level ' + level); // update H1 with this change in the value of level 

    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColurs[randomNum];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
};

function playSound(musicName) {
    let audio = new Audio('sounds/' + musicName + '.mp3');
    audio.play();
};

function animationPress(currentColour) {
    let colour = $('#' + currentColour);
    colour.addClass('pressed');
    
    setTimeout(function() {
        colour.removeClass('pressed');
    }, 50);
};

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{
        console.log('wrong');
        playSound("wrong");

        $('body').addClass("game-over");
        setTimeout(function() {
            $('body').removeClass('game-over');
        },200);
        
        $('#level-title').text('Game Over 😁! press any key to start over!');
        startOver();
    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};