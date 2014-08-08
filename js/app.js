$(document).ready(function(){
/*--- Function that generates the random number ---*/
    var newGame =  function() {
           randomNo = Math.floor((Math.random()*100)+1);
           console.log(randomNo);
    };

/*---Block of code that evaluates the players guess ---*/
    var playGame = function () {            
                      guessNo = $('input').val();
                      deviationNo = Math.abs(+guessNo-randomNo);
                      if (+guessNo === randomNo ) {
                         $('#feedback').text('You Guessed the correct number ' + guessNo + '. Your average \
                          guess was ' + sigma + ' away from the correct number');
                      }
                      else if (deviationNo >= 50) {
                         $('#feedback').text('Rigor Mortis!');
                      }
                      else if (deviationNo >= 35) {
                         $('#feedback').text('Very Cold');
                      }
                      else if (deviationNo >= 25) {
                         $('#feedback').text('Cold');
                      }
                      else if (deviationNo >= 15) {
                         $('#feedback').text('Warm');
                      }
                      else if (deviationNo >= 10) {
                         $('#feedback').text('Hot');
                      }
                      else if (deviationNo >= 5) {
                         $('#feedback').text('Very Hot');
                      }
                      else if (deviationNo > 0) {
                         $('#feedback').text('Incandescent');
                      } 
                      else {
                         alert('the game is broken');
                      };
    };
    var arrayGuessNo = [];
    var analytics = function () {
                      arrayGuessNo.push(deviationNo);
                      var prevDeviationNo = arrayGuessNo[(arrayGuessNo.length - 2)];
                      console.log('new Guess');
                      console.log(prevDeviationNo);
                      console.log(deviationNo);
                      if (prevDeviationNo === undefined || prevDeviationNo === null )  {
                            $('#distanceFeedback').text('This is your first guess');   
                      } else if ((deviationNo - prevDeviationNo) = 0) {
                            $('#distanceFeedback').text('You got it!');      
                      } else if (deviationNo <= prevDeviationNo) {
                            $('#distanceFeedback').text('Your getting closer');      
                      } else {
                            $('#distanceFeedback').text('Your getting further away');
                      };                             
    };

    var stdDev = function () {
                      var totalArrayGuess = 0;
                      for (var i = 0; i < arrayGuessNo.length; i++) {
                          totalArrayGuess += Math.pow(arrayGuessNo[i],2); 
                      };
                      sigma = parseInt(Math.sqrt(totalArrayGuess/arrayGuessNo.length));
                      console.log(sigma);
                      console.log(arrayGuessNo.length);
                      console.log(arrayGuessNo);
                      console.log(totalArrayGuess);
    };
     
/*--- Events that allow you to play the game ---*/
    function userEntry () {
              if ( $('#feedback').length < 20) {
                         guessNo = $('input').val();
                         if (guessNo <= 0 || guessNo > 100 || isNaN(guessNo) || guessNo % 1 !== 0) {
                                  alert('You have not entered in a correct value. Please enter a \
                                  number from the 1 to 100.');
                         }
                         else {    
                                   playGame();
                                   guessNoStore = '<li>' + guessNo + '</li>';
                                   $('#guessList').append(guessNoStore);
                                   countGuess = $("#guessList").children().length;
                                   $('#count').text(countGuess);
                                   $('#userGuess').val(' ');
                                   analytics();
                                   stdDev();
                         };
              }  else {
                   alert('A new game will now begin');
              };                  
    }

    $('#guessButton').on('mousedown', function (event) {
         event.preventDefault();
         userEntry();  
         /*event.stopPropagation(); */
     });

    $('#userGuess').on('keydown', function (event) {
        if(event.which === 13) {
         userEntry();
        };
     });

/*---Restarts the game when the new game button is clicked ---*/
    function restart () {
           $('#feedback').text('Make your Guess!');
           $('#count').text('0');
           $('section li').remove();
           newGame();
    }

    $('.new').on('mousedown', function() {
           restart();
    });
    
/*---Runs the randomNoGen when page loads ---*/
    newGame();

/*--- Display information modal box ---*/
    $(".what").click(function(){
      $(".overlay").fadeIn(1000);
    });

/*--- Hide information modal box ---*/
    $("a.close").click(function(){
      $(".overlay").fadeOut(1000);
    });

});




















