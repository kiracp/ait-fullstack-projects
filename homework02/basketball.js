var request = require('request');
var players = '';

var options = {
  url: 'http://foureyes.github.io/csci-ua.0480-fall2015-001/homework/02/2014-06-15-heat-spurs.json',
};

var options2 = {
  url: 'http://foureyes.github.io/csci-ua.0480-fall2015-001/homework/02/2014-04-09-thunder-clippers.json'
};

 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    players = JSON.parse(body);

    // This is the actual work
    setUpGame();
	finalScore();
	highestThreesPercentage();
	teamMostRebounds();
	nonGuardMostAssists();
	playerMoreTurnThanAssist();
  }
}

// When data loaded from URL, callback!
request(options, callback);
request(options2, callback);

/*
 * General helper functions
 * (Used in multiple calculations)
 */

// Initialize teams

var team1 = '';
var team2 = ''; 

// Determine team
function getTeam1(player) { return player.team === team1;};
function getTeam2(player) {return player.team === team2;};

// Return just name
function getName(player) { return player.name; };

// Sum an array
function total (arr) {
	var total = arr.reduce(function (total, n){
		return total + n;
	}, 0)
	return total;
}

// Calculate score
function getScore(player) {
	return parseInt(player.freeThrowsMade + (player.fieldGoalsMade-player.threesMade)*2 + player.threesMade*3);
}

/*
 * Set up da game
 */

function setUpGame() {
	// Clear teams
	team1 = '';
	team2 = '';
	
	// Get teams
	players.forEach(function(ele) {
		if (team1 === '') team1 = ele.team;
		if (team1 !== ele.team) {
			team2 = ele.team; 
			return;
		}
	});
}

/* 
 * Final Score
 */

function finalScore() {

	// Calculate totals
	var totalTeam1 = total(players.filter(getTeam1).map(getScore));
	var totalTeam2 = total(players.filter(getTeam2).map(getScore));

	// Print result
	console.log("\nFinal score: %s %d, %s %d", team1, totalTeam1, team2, totalTeam2)
	console.log("=====")
}

/*
 * Player With Highest Percentage of Points From Three Pointers
 */

function highestThreesPercentage() {

	// Calculate percentage of threes from all points made
	function threesPercentage(player) { 
		if (getScore(player) > 10) {
			return (player.threesMade / getScore(player));
		}
	}

	// Invoke threesPercentage on all players to find the highest percentage
	var mostThrees = players.reduce( function(threes, player) {
		if (threesPercentage(player) > threes.percentage) {
			threes.name = player.name; 
			threes.percentage = threesPercentage(player)
		}
		return threes;
	}, threes = {name:'', percentage:0});

	// Print result
	console.log("* Player with highest percentage of points from three pointers: %s", threes.name);
}

/*
 * Team With Most Rebounds
 */ 

function teamMostRebounds() {

	// Calculate total rebounds for Team 1
	var reboundsTeam1 = players.filter(getTeam1).reduce( function(rebounds, player) {
		return parseInt(rebounds + player.defensiveRebounds + player.offensiveRebounds);
	}, rebounds = 0);

	// Calculate total rebounds for Team 2
	var reboundsTeam2 =  players.filter(getTeam2).reduce( function(rebounds, player) {
		return parseInt(rebounds + player.defensiveRebounds + player.offensiveRebounds);
	}, rebounds = 0);

	// Print result
	console.log("* Team with most rebounds: ", (reboundsTeam1 > reboundsTeam2 ? team1 + " with " + reboundsTeam1 : team2 + " with " + reboundsTeam2));
}

/*
 * Non Guard Player With Most Assists
 */

function nonGuardMostAssists() {

	// Helper functions
	function notGuard(player) { return player.position !== 'G' };
	function assists(player) { return player.assists };

	// Call helper to find player with most assists
	var mostAssistsPlayer = players.filter(notGuard).reduce( function(assistsPlayer, player) {
		if (player.assists > assistsPlayer.assists) {
			assistsPlayer.name = player.name; 
			assistsPlayer.assists = player.assists
		}
		return assistsPlayer;
	}, assistsPlayer = {name:'', assists:0});

	// Print result
	console.log("* Non guard player with most assists: %s with %d assists", mostAssistsPlayer.name, mostAssistsPlayer.assists);
}

/* 
 * Players With More Turnovers Than Assists
 */ 

function playerMoreTurnThanAssist() {

	// Find player with more turnovers than assists
	function moreTurnThanAssist(player) {
		return (player.assists < player.turnovers) === true; 
	}

	// Generate array of players with more turnovers than assists
	var badPlayers = players.filter(moreTurnThanAssist).map(getName);

	// Print result
	console.log("* Players with more turnovers than assists: ");
	badPlayers.forEach(function(ele) { console.log("  " + ele)});

}