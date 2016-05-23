startButton.addEventListener('click', start);

/*
 * Get it started!
 */

function start() {
  var numSymbols = document.getElementById("numSymbols").value
  if (checkNum(numSymbols)) {
  	generateCards(numSymbols);
  }
}

/*
 * Make sure number input is valid
 */

function checkNum(num) {
	var errormsg = document.createElement('div');
	var error = "Number must be between 2 and 8."
	// If numSymbols is out of range
	if (num > 8 || num < 2){
		// Make sure they know
		document.body.appendChild(errormsg).textContent = error;
		return false;
	}
	// Else
	else { 
		// Remove error message, if it exists
		var removeMe = document.body.lastElementChild;
		if (removeMe.innerHTML == error) {
			document.body.removeChild(removeMe);	
		}
		// Hide the form
		document.querySelector('#game').style.visibility = "hidden";
		document.querySelector('#startButton').style.visibility = "hidden";
		
		// Let's start this shit up
		return true;
	}
}

/*
 * Input is number of symbols to generate
 */

function generateCards(num){
	// num symbols * 2 = num cards
	var numCards = num*2;

	var symbols = ['#', '$', '*', '&', '@', '%', '!', '~'];
	symbols = symbols.slice(0, num);

	// Two copies of each, so there will be pairs
	symbols = symbols.concat(symbols);

	// Shuffle the symbols
	symbols = shuffle(symbols);

	// Add guess counter element
	var guess = document.createElement("div");
	guess.setAttribute("id", "guessesInfo");
	guess.textContent = "Total guesses: ";
	document.body.appendChild(guess);

	// Create container for cards
	var container = document.createElement('div');
	container.setAttribute("id", "container");
	document.body.appendChild(container);

	// Create the cards
	while (numCards > 0) { 
		// Create card
      	var card = document.createElement("div");
      	card.setAttribute("id", "card");
      	card.setAttribute("flipped", "false");

		var symbol = symbols.pop();
		card.setAttribute("symbol", symbol);

		// Calls handleCard event, below, when clicked
      	card.addEventListener('click', handleCard);
      	container.appendChild(card);

		numCards--;
	}

	// Create game elements
	var numClicks = 0;
	var compare = [];

	var guesses = 0;
	var matchTotal = +num; // coerce to int
	var matches = 0;
	
	function handleCard(evt){
		// Increment click count
		numClicks++;

		// Style the card
		var card = evt.target;
		var symbol = card.getAttribute("symbol");
		card.textContent = symbol;
		card.style.backgroundColor = "white";
		card.style.border = "2px solid #333377";	
		card.setAttribute("flipped", "true");

		// If card has been clicked
		if (compare.length > 0) {
			// Update guess counter
			guesses++;
			guess.textContent = "Total guesses: " + guesses;
			
			var compareCard = compare.pop();
			if (compareCard.textContent === card.textContent) {
				// Match found~
				matches++;
				compareCard.removeEventListener('click');
				card.removeEventListener('click');

				// Check to see if game is over
				if (matches === matchTotal) {
					// hide the board and guess counter
					document.querySelector('#container').style.visibility = "hidden";
					document.querySelector('#guessesInfo').style.visibility = "hidden";
					// display winner message!
					var winning = document.createElement("div");
					winning.setAttribute("id", "winning");
					winning.textContent = "You won!!!";
					document.body.appendChild(winning);
					var guessesInfo = document.createElement("div");
					guessesInfo.setAttribute("id", "guessesInfo");
					guessesInfo.textContent = "Total guesses: " + guesses;
					document.body.appendChild(guessesInfo);
				}
			}

			// No match
			else {
				// EXTRACREDIT: Using SetTimeout
				setTimeout(function() {
					// Reset card style
					card.textContent = "";
					card.style.backgroundColor = "#F14434";
					card.style.border = "2px solid #F14434";
					card.setAttribute("flipped", "false");

					// Redo other style
					compareCard.textContent = "";
					compareCard.style.backgroundColor = "#F14434";
					compareCard.style.border = "2px solid #F14434";
					compareCard.setAttribute("flipped", "false");
				}, 1000);
			}
		}
		// Else, add card to comparison array
		else {
			compare.push(card);
		}
	}
}

/*
 * Shuffle (reused code from blackjack project)
*/
function shuffle(cards) { 
	
	// Create shuffled array
	var shuffleDeck = [];

	// While there are still cards in original deck
	while (cards.length > 0) {
		var index = getRandomDeck();
		shuffleDeck.push(cards[index]);
		// Remove from deck
		cards.splice(index, 1);
	}
	
	// Helper function to select random
	function getRandomDeck() {
		var answer = Math.random() * cards.length;
		// Change to valid index
		answer = Math.floor(answer);
		return answer;
	}

	//	Return: randomly ordered array of objects
	return shuffleDeck;

}