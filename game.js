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
});

function nextSequence() {
    // alert(level);
    level++;
    $('#level-title').text('Level ' + level); // update H1 with this change in the value of level 
    // console.log(level);
    
    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColurs[randomNum];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

function playSound(musicName) {
    let audio = new Audio('sounds/' + musicName + '.mp3');
    audio.play();
}

function animationPress(currentColour) {
    let colour = $('#' + currentColour);
    colour.addClass('pressed');
    
    setTimeout(function() {
        colour.removeClass('pressed');
    }, 50);
}