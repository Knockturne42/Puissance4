var playerOne;
var playerTwo;
var player = document.getElementById('player');
var chooseBlock = document.getElementById('choose');
var playButton = document.getElementById('play');
var tableGame =    [[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 1, 0, 0, 0, 0],
					[0, 0, 1, 0, 0, 0, 0],
					[0, 0, 1, 0, 0, 0, 0],
					[0, 0, 1, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0]];
var playerTurn = 0;
var foot = document.getElementById('foot');

function turnPlay()
{
	if(playerTurn == 0)
	{
		console.log("Joueur 1");
		playerTurn = 1;
	}
	else
	{
		console.log("Joueur 2");
		playerTurn = 0;
	}
}

foot.addEventListener("click", function(){
		turnPlay();
		resolution(tableGame);
});

function resolution(tableGame) {
	for (var i = 0; i < tableGame.length; i++) {
		for (var j = 0; j < tableGame[i].length; j++) {
			if (tableGame[i][j] != 0) {
				var h = resHorizon(tableGame, i, j, tableGame[i][j]);
				var v = resVertic(tableGame, i, j, tableGame[i][j]);
				var d = resDiago(tableGame, i, j, tableGame[i][j]);
				if (h || v || d)
				{
					console.log("h: "+h+" v: "+v+" d: "+d);
				}
			}
		}
	}
}

function resHorizon(tableGame, i, j, valTab) {
	for (var index = 0; index < 4 && j < (tableGame[i].length - 3); index++) {
		if(valTab != tableGame[i][j + index])
			return(0);
		else
		{
			if (index+1 == 4) {
				return(1);
			}
		}
	}
}

function resVertic(tableGame, i, j, valTab) {
	for (var index = 0; index < 4 && j < (tableGame[i].length - 3); index++) {
		if(valTab != tableGame[i + index][j])
			return(0);
		else
		{
			if (index+1 == 4) {
				return(1);
			}
		}
	}
}

function resDiago(tableGame, i, j, valTab) {
	for (var index = 0; index < 4 && j < (tableGame[i].length - 3); index++) {
		if(valTab != tableGame[i + index][j + index])
			return(0);
		else
		{
			if (index+1 == 4) {
				return(1);
			}
		}
	}
}
function playGame() {
	playButton.addEventListener("click", function(){
		if (!playerOne) {
			chooseBlock.style.display = "block";
			setDisc(playerOne, playerTwo);
		}
	});
}

function setDisc(playerOne, playerTwo) {
	var choice = document.getElementsByClassName('discChoose');
	for (var i = 0; i < choice.length; i++) {
		(function(index, playerOne, playerTwo){
			choice[index].addEventListener("click", function() {
				logoPlayer(choice[index]);
			})
		})(i);
	}
}

function logoPlayer(choice) {
	if (!playerOne)
	{
		playerOne = choice.src;
		player.innerHTML = "Joueur 2";
		player.style.backgroundColor = "rgba(50, 250, 200, 1)"
		choice.style.backgroundColor = "rgba(200, 250, 50, 1)";
	}
	else if (!playerTwo)
	{
		playerTwo = choice.src;
		choice.style.backgroundColor = "rgba(50, 250, 200, 1)";
		setTimeout(function(){ chooseBlock.style.display = "none"; }, 3000);
		player.style.backgroundColor = "grey";
		player.innerHTML = "3";
		setTimeout(function(){ player.innerHTML = "2"; }, 1000);
		setTimeout(function(){ player.innerHTML = "1"; }, 2000);
	}
	else {
	}
}

playGame();