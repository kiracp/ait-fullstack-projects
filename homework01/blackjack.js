var readlineSync = require('readline-sync');

/*
 * Returns an array of 52 cards
 */

function generateCards() {

	var deck = [];

	var suit = ['♠', '♥', '♦', '♣'];
	var face = ['2', '3', '4', '5', '6', '7',
			'8', '9', '10', 'J', 'Q', 'K', 'A'];

	// Iterate thru face list
	for (var i = 0; i < face.length; i++) {

		// Iterate thru suit list
		for (var j = 0; j < suit.length; j++ ) {
			var card = {
				face: null,
				suit: null
			}
			card['face'] = face[i];
			card['suit'] = suit[j];
			deck.push(card);
		}
	};

	// Return array of card objects
	return deck;
}

/*
 * Takes in array of sorted cards
 * Returns array of shuffled cards
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

/*
 * Takes in players' hand
 * Returns total number of points in hand
 */

function calculateHand(cards) {

	var total = 0;
	var length = cards.length;
	var points = [];
	var aceCount = 0;

	// Convert royals to points, add 'em up
	for (var i = 0; i < length; i++){
		if (cards[i].face == 'J' || cards[i].face == 'Q' ||
			cards[i].face == 'K') {
			  // Face cards = 10 pts
			  total = total + parseFloat(10);
		}
		else if (cards[i].face == 'A') {
			// Aces = 11 pts
			total = total + parseFloat(11);
			aceCount++;
		}
		else {
			total = total + parseFloat(cards[i].face);
		}
	}

	// If greater than 21 and there are aces
	while (total > 21 && aceCount > 0) {
		total = total - 10;
		aceCount--;
	}

	return total;
}

/*
 * Function takes in point totals from players
 * Returns winner or tie
 */

function determineWinner(human, computer) { 

 	var winner = '';

 	// If either went over 21...
 	if (human > 21 || computer > 21) {
 		// Both over 21
 		if (human > 21 && computer > 21) {
			winner = "YOU ALL BUST!";
			return winner;
 		}
 		// only computer busts
 		if (human <= 21) {
 			winner = "You win!";
 			return winner;
 		}
 		// Else, human busts
 		else {
 			winner = "Computer wins!";
			return winner;
 		}
 	}

 	// If it's a tie
 	if (human==computer){
 		winner = "It's a tie!!!";
 		return winner;
 	}

 	// If both under 21, find the closest value
 	else {
 		var humanDif = 21-human;
 		var compDif = 21-computer;
 		if (humanDif>compDif) winner = 'Computer wins!';
 		else winner = "You win!";
 	}
 	return winner;
}

/*
 * Takes in a card array
 * Returns array formatted for print
 */

function formatCards(cards) {
	var toPrint = '';
	var arrayPrint = [];
	/*
	cards.forEach(function(ele) { 
	  toPrint = ele.face + ele.suit;
	  arrayPrint.push(toPrint);
	});
*/
	cards.forEach(function(ele) { 
	  toPrint += " " + ele.face + ele.suit + " ";
	});

	return toPrint;
}

/* 
 * ACTUAL GAME
 */

var player = [];
var computer = [];

var cards = generateCards();
cards = shuffle(cards);

while (cards.length > 26) {

	// Initialize hand
	var playerTotal = 0;

	// Deal one card, remove from deck
	player.push(cards[0]);
	cards.splice(0, 1);

	// Calculate initial value
	playerTotal += calculateHand(player);


	// Player plays
	var stay = false;
	while (!stay){
		console.log("Your hand is: ", formatCards(player), "... for a total of ", playerTotal);
		var letter = readlineSync.question('type h to (h)it or s to (s)tay: ');
			
		switch (letter) {
			case 'h':
				// Deal one card, calculate value, remove from deck
				if (playerTotal < 21){
					player.push(cards[0]);
					playerTotal = calculateHand(player);
					cards.splice(0, 1);
				}
				// If more than 21, break out
				else { stay = true };
				break;
			// If "stay", break from loop
			case 's':
				stay = true;
				break;
			default:
				console.log("Invalid input!");
				break;
			
		}
	}

	// Computer plays
	var computerTotal = 0;

	// Computer calculates total
	stay = false;
	while (!stay) {
		computer.push(cards[0]);
		computerTotal = calculateHand(computer);
		if (computerTotal > 17) stay = true;
		cards.splice(0, 1);
	}

	// Output scores
	console.log("Your hand: ", formatCards(player), "(", playerTotal,
			"), Computer hand: ", formatCards(computer), "(", computerTotal, ")");

	// Calculate winner
	var winner = determineWinner(playerTotal, computerTotal);
	console.log(winner);

	// Clear hands
	player = [];
	computer = [];
	playerTotal = 0;
	computerTotal = 0;

	console.log("\nOnly ", cards.length, " cards left in deck!");
	console.log("-----------------------");

}

console.log("Less than 26 cards left. Game over!");
console.log("-----------------------");



