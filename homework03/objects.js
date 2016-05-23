// objects.js

function Player(name){
	this.name =  name;
	this.prev_moves = [];
	this.opp_moves = [];
}

Player.prototype.move=function(){
	// GENERATE NEXT MOVE
	var nextMove = 'R';

	// SAVE IN PREV MOVES
	this.prev_moves.push(nextMove);

	// RETURNS
	return nextMove;
};

Player.prototype.recordOpponentMove =function(opponentMove){
	this.opp_moves.push(opponentMove);

}

HistoryRepeatsItselfPlayer.prototype = new Player();
HistoryRepeatsItselfPlayer.prototype.constructor=HistoryRepeatsItselfPlayer;
function HistoryRepeatsItselfPlayer(name){
	this.name =  name;
}
HistoryRepeatsItselfPlayer.prototype.move=function() {
	var myMove = '';

	var considerThis = this.opp_moves[this.opp_moves.length-1];

	if (considerThis === 'R') myMove = 'P';
	else if (considerThis==='P') myMove = 'S';
	else if (considerThis==='S') myMove = 'R';
	else { // no move
		var possibilities = ['R', 'P', 'S'];
		var answer = Math.random() * possibilities.length;
		answer = Math.floor(answer);
		myMove = possibilities[answer];
	}
	this.prev_moves.push(myMove);

	return myMove;
}
function LookAtPreviousMoveStrategy(){	
	LookAtPreviousMoveStrategy.prototype.getNextMove = function(moves){
		var considerThis = moves[moves.length-1];
		if (considerThis === 'R') myMove = 'P';
		else if (considerThis==='P') myMove = 'S';
		else if (considerThis==='S') myMove = 'R';
		else { // no move
			var possibilities = ['R', 'P', 'S'];
			var answer = Math.random() * possibilities.length;
			answer = Math.floor(answer);
			myMove = possibilities[answer];
		}
		moves.push(myMove);
		return myMove;
	}
}

StrategyPlayer.prototype = new Player();
StrategyPlayer.prototype.constructor=StrategyPlayer;
function StrategyPlayer(name, strategy){
	this.name =  name;
	this.strategy = strategy;
}
StrategyPlayer.prototype.recordOpponentMove = function() {
	this.opp_moves.push(opponentMove);
}
StrategyPlayer.prototype.move = function() {
	var move = this.strategy.getNextMove(this.prev_moves);
	return move;
}	

var basicPlayer = new Player("Normal Nancy");
var historyPlayer = new HistoryRepeatsItselfPlayer("Timely Tabetha");
var strategyPlayer = new StrategyPlayer("Previous Patty", new LookAtPreviousMoveStrategy());

console.log(basicPlayer.name);
console.log("---------");
console.log(basicPlayer.name, " plays:", basicPlayer.move());
basicPlayer.opp_moves.push('P');
console.log(basicPlayer.name, " plays:", basicPlayer.move());
console.log("All of ", basicPlayer.name, "'s moves so far:", basicPlayer.prev_moves);
console.log("All of opponent's move's so far:", basicPlayer.opp_moves, "\n");

console.log(historyPlayer.name);
console.log("---------");
console.log(historyPlayer.name, "'s first move is random':", historyPlayer.move());
historyPlayer.opp_moves.push('R');
console.log("If opponent plays rock, ", historyPlayer.name, " will play paper: ", historyPlayer.move());
historyPlayer.opp_moves.push('P');
console.log("If opponent plays paper, ", historyPlayer.name, " will play scissors: ", historyPlayer.move());
console.log("All of ", historyPlayer.name, "'s moves so far:", historyPlayer.prev_moves);
console.log("All of opponent's move's so far:", historyPlayer.opp_moves, "\n");

console.log(strategyPlayer.name);
console.log("---------");
console.log(strategyPlayer.name, "'s first move is random':", strategyPlayer.move());
strategyPlayer.opp_moves.push('R');
console.log("If opponent plays rock, ", strategyPlayer.name, " will play paper: ", strategyPlayer.move());
strategyPlayer.opp_moves.push('P');
console.log("If opponent plays paper, ", strategyPlayer.name, " will play scissors: ", strategyPlayer.move());
console.log("All of ", strategyPlayer.name, "'s moves so far:", strategyPlayer.prev_moves);
console.log("All of opponent's move's so far:", strategyPlayer.opp_moves, "\n");