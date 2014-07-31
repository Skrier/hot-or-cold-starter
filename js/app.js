
$(document).ready(function(){
	  /*--- Variable that generates the random number ---*/
	 var randomNo,
	      newGame = function () {
	 	   var randomNo = Math.floor((Math.random()*100) + 1);
           console.log(randomNo); 
           return randomNo;
     };

	/*--- As the page loads the function runs ---*/
  	randomNo = newGame();

    /*--- New Game clears all the results and regens a random number---*/
  	$(".new").mousedown(function () {
        	$('section li').remove();
        	$('#count').text("0");
            $('#feedback').text("Make your Guess!");
        	randomNo = newGame ();
        });

     /*--- Variable that gets the players guess and coverts it to a number ---*/
	 var inputGuess = +$('#userGuess').val();  

    /*--- Variable that provides them feedback on how close they are ---*/
    var runGame = function (inputGuess) {
          var randomNom = randomNo;
          var inputGuess = +$('#userGuess').val();
          var variance = Math.abs(inputGuess - randomNom);
          if (inputGuess <= 0) {
             alert('You have not entered in a correct number. Please enter a number greater the 0.');
          } else if (variance >= 50) {
             $('#feedback').text("Rigor Mortis!");
           }
           else if (variance < 50 && variance >= 35) {
             $('#feedback').text("Very Cold");
           }
           else if (variance < 35 && variance >= 25) {
             $('#feedback').text("Cold");
           }
           else if (variance < 25 && variance >= 15) {
             $('#feedback').text("Warm");
           }
           else if (variance < 15 && variance >= 10) {
             $('#feedback').text("Hot");
           }
           else if (variance < 10 && variance >= 5) {
             $('#feedback').text("Very Hot");
           }
           else if (variance < 5 && variance >= 1) {
             $('#feedback').text("Incandescent");
           } 
           else {
           	 $('#feedback').text("You Guessed the correct number " + inputGuess);
           };
    };

     /*--- Variable that appends the guess to the <ul id = guessList> ---*/
     var listGuess = "<li>"+ inputGuess +"</li>";

     /*--- Variable that counts the number of Guesses ---*/
     var countGuess = $(".guessBox li").length;

     /*--- jQuery Events that allow you to play the game ---*/
    $("#guessButton").mousedown(function () {
            $('#count').text(countGuess);
        	$('#guessList').append(listGuess);
        	runGame();   	
    });

    $("#userGuess").keydown(function (enter) {
        	if(enter.which === 13) {
        	$('#guessList').append(listGuess);
        	$('#count').text(countGuess);
	        runGame();
	        }
    });

    /*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});


