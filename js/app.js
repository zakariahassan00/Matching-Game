/*
 * Meomory Game : its a matching cards game depend on mathing all pairs of cards
 * the more accurate match the best star rating
 */

//declaring all needed vairables
// 1 move = 1 try of opening two cards
let moves = 0 ;
// match list containg all open cards 
let matchList = [];
// list containg the opened html
let nodeList = [];
// array contain a list of class names of the Cards 
let cards = [];
// number of minutes 
let min = 0 ;
// number of seconds
let sec = 0 ;
// boolean value to start or stop the timer
let time = false ;
// list contain the number of matched pair of cards (if 8 pairs is open the the game is over)  
let matchedCards = 0 ;
const close = document.querySelector('.close');
const again = document.querySelector('.playAgain');
const timer = document.querySelector('.timer');
const minTime = document.querySelector('.min');
const secTime = document.querySelector('.sec');
const x = document.querySelectorAll('.card');
const star = document.querySelectorAll('.fa-star') ;
const cardClasses = document.querySelectorAll('.shuffle');
const restart = document.querySelector('.restart');



window.onload = startGame() ;

function startGame () {

    //start the count
    time = true ;
    count();

    // shuffle Cards array
    shuffle(cards) ;

    // set up the event listener for a card. If a card is clicked open the card
    // and make checks on them
    for (let i = 0; i < x.length; i++) {
        x[i].addEventListener("click", function (){
            openCard(this);
            addCard(this);
        });
    }

    // restart button
    restart.addEventListener('click', function() {
        reset();
    });

    // congratiulations window
    // reset the boeard if the user want to play again 
    again.addEventListener('click', function() {
        document.querySelector('.win').classList.remove('over');
        document.querySelector('.container').classList.remove('over');
        reset();
    });

    // disable the click event if the user clicked close 
    close.addEventListener('click', function() {
        document.querySelector('.win').classList.remove('over');
        document.querySelector('.container').classList.remove('over');
        disable();
    });
}

/*
****************** Functions of The Game!***********************
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    // access the initial cards arrangment and save it in Cards array
    for (let i = 0 ; i < cardClasses.length ; i++) {
        cards[i] = cardClasses[i].className ;    
    }
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    //now apply the new arrangment
    for (let i = 0 ; i < cardClasses.length ; i++) {
        cardClasses[i].className = cards[i] ;    
    }
}

// opening the card function
function openCard (target){
    target.classList.toggle('open');
    target.classList.toggle('show');
    target.classList.add('disabled');
}

// add the opened cards to a list and make the checks
function addCard (target) {

    // get the card name to match the cards
    const card = target.firstElementChild.classList[2];
    nodeList.push(target) ;   
    matchList.push(card) ;
    const len = matchList.length ;

    // if two cards are open now its time to check them
    if (len === 2) {
        // if they match
        if (matchList[0] === matchList[1]){
            match();
            gameMoves();
            matchedCards++ ;
        }
        // if they not match
        else {
            unmatch();
            gameMoves();
        }
    }
    rating()
}

// if the two opened cards match leave the cards open with green background
function match () {
    disable();
    nodeList[0].classList.remove('open', 'show');
    nodeList[1].classList.remove('open', 'show');
    nodeList[0].classList.add('match');
    nodeList[1].classList.add('match');
    enable();
    nodeList = [] ;
    matchList= [] ;
}

// if the two cards not match close the cards 
function unmatch () {
    // give them red background before close
    nodeList[0].classList.add('notmatch');
    nodeList[1].classList.add('notmatch');

    disable();
    // delay for .8s then close the cards again
    setTimeout(function(){
        nodeList[0].classList.remove('open', 'show', 'notmatch');
        nodeList[1].classList.remove('open', 'show', 'notmatch');
        enable();
        nodeList = [] ;
        matchList= [] ;
    }, 800);
}

// function for disabling any further clicks temporarily(until enabled)
function disable() {
    for (let i = 0; i < x.length; i++){
        x[i].classList.add('disabled');
    }
}

// enable the user to click again
function enable() {
    for (let i = 0; i < x.length; i++){
        x[i].classList.remove('disabled');
    }
}

// increase the counter of moves
function gameMoves () {
    moves++
    document.querySelector('.moves').textContent = moves;
}

// function for rating the player basen on the number of moves
function rating() {
        
    // if the moves is above 10 and below 15 give the user 2STAR rating
    if (moves > 10 && moves <= 14){
        star[2].style.visibility = "hidden";
    }

    // if the moves is above above 14 give the user 1 star    
    else if (moves > 14){
        star[1].style.visibility = "hidden";
    }

    // if the user matched all the cards close the game with one star
    if (matchedCards === 8) {
        time = false ;
        over() ;
    } 
}

function reset () {
    // reset the cards
    for (let i = 0; i < x.length; i++){
        x[i].classList.remove('disabled', 'show', 'open', 'match', 'notmatch');
    }

    shuffle(cards) ;

    // reset the star rating    
    for (let i = 0; i < star.length; i++) {
        star[i].style.visibility = 'visible' ;
    }

    // reset all variables and arrays
    moves = 0 ;
    document.querySelector('.moves').textContent = '0';
    matchList = [];
    nodeList = [];
    cards = [];
    matchedCards = 0 ;

    // reset the time counter 
    min = 0 ;
    sec = 0 ;

    // start the counter
    time = true ;
}

// time counter function 
function count(){
    
    setInterval(function(){
        if (time === true ) {
            // increase the sec variable value of 1  every sec 
            sec++
            if (sec < 10 ){
                secTime.textContent = '0' + sec;
            }

            if ( min < 10){
                minTime.textContent = '0' + min;
            }

            if (sec > 9) {
                secTime.textContent = sec;
            }

            if ( min > 9) {
                minTime.textContent = min;
            }
            if (sec === 60) {
                // if the seconds reached 60 increase the min variable by value of 1 
                // and reset the sec variable and so on
                sec = '00' ;
                min++
                secTime.textContent = sec;
                minTime.textContent = min;
                if (min < 10) {
                    minTime.textContent = '0' + min;
                }
            }
        }
        // notice i keep add '0' in some cases to just keep this time format 00:00
    }, 1000) 
    
}

// the game over message 
function over () {
    let finishTime = document.querySelector('.timer').innerText ;
    const starRating = document.querySelector(".stars").innerHTML;
    document.querySelector('.win').classList.add('over');
    document.querySelector('.container').classList.add('over');
    document.querySelector('.win_time').textContent = 'you have made it in: ' + finishTime + '!!';
    document.querySelector('.win_moves').textContent = 'number of moves was: ' + moves;
    document.querySelector(".starRating").innerHTML = starRating;
}