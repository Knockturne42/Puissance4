var playerOne;
var playerTwo;
var player = document.getElementById('player');
var chooseBlock = document.getElementById('choose');
var playButton = document.getElementById('play');
var tableGame =    [[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0]];
var playerTurn = 0;
var foot = document.getElementById('foot');
var tableSelect = document.getElementsByTagName('td');
var encounter = tabDivInit("e", 51);
var encountDiv = document.getElementById("encounter");
var divDisc = tabDivInit("d", 50);

function init_table(playerOne, playerTwo, playerTurn, tableGame)
{
	for(var i = 0; i < tableSelect.length; i++) {
       divDisc[i].addEventListener("click", backgroundIco(i, playerOne, playerTwo, playerTurn, tableGame));
	}
}

function backgroundIco(i, playerOne, playerTwo, playerTurn, tableGame) {
    return function() {
    	if (playerTurn == 0)
    	{
        	divDisc[i].style.backgroundImage = "url('"+playerOne+"')";
        	tableGame[i % (tableGame.length)][Math.floor(i / (tableGame.length))] = 1;
    	}
        else
        {
        	divDisc[i].style.backgroundImage = "url('"+playerTwo+"')";
        	tableGame[i % (tableGame.length)][Math.floor(i / (tableGame.length))] = 2;
    	}
    	console.log(tableGame);
    	turnPlay();
    };
}

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
	return(0);
}

function resVertic(tableGame, i, j, valTab) {
	for (var index = 0; index < 4 && i < (tableGame[i].length - 3); index++) {
		if(valTab != tableGame[i + index][j])
			return(0);
		else
		{
			if (index+1 == 4) {
				return(1);
			}
		}
	}
	return(0);
}

function resDiago(tableGame, i, j, valTab) {
	for (var index = 0; index < 4 && j < (tableGame[i].length - 3) && i < (tableGame[i].length - 3); index++) {
		if(valTab != tableGame[i + index][j + index])
			return(0);
		else
		{
			if (index+1 == 4) {
				return(1);
			}
		}
	}
	return(0);
}

function playGame() {
	playButton.addEventListener("click", function(){
		if (!playerOne) {
			chooseBlock.style.display = "block";
			setDisc(playerOne, playerTwo);
		}
		else
		{
			init_table(playerOne, playerTwo, playerTurn, tableGame);
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
		setTimeout(function(){ chooseBlock.style.display = "none"; }, 5500);
		player.style.backgroundColor = "grey";
		player.innerHTML = "3";
		setTimeout(function(){ player.innerHTML = "2"; }, 1000);
		setTimeout(function(){ player.innerHTML = "1"; }, 2000);
		setTimeout(function(){ player.innerHTML = "0"; }, 3000);
		setTimeout(function(){ encountStart(); }, 3000);
		setTimeout(function(){var audio = document.getElementById('myAudio');
	audio.autoplay = "true"; audio.loop = "true";}, 2200)
	}
	else {
	}
}
playGame();




//css pour animation combat debut.

function tabDivInit(val, max) {
	var array = [];
	for (var i = 1; i < max; i++) {
		array.push(document.getElementById(val+i));
	}
	return(array);
}


function encountStart() {
	encountDiv.style.display = "flex";
	encountFlash();
	encountAction();
	setTimeout(function(){ encountDiv.style.marginLeft = "5000px"; encountDiv.style.transitionDuration = "1s";}, 2600);
	setTimeout(function(){ encountDiv.style.display = "none";}, 3600);
}

function encountFlash() {
	encountDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; }, 166);
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; }, 332);
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; }, 498);
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; }, 664);
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; }, 830);
}

function encountAction()
{
	t = 830;
	for (var i = 0; i < 5; i++) {
		encSetOut(i + (9*i), t);
		t += 30;
	}
	for (var i = 41; i < 50; i++) {
		encSetOut(i, t);
		t += 30;
	}
	for (var i = 39; i > 0; i -= 10) {
		encSetOut(i, t);
		t += 30;
	}
	for (var i = 9; i > 0; i--) {
		encSetOut(i, t);
		t += 30;
	}
	for (var i = 1; i < 4; i++) {
		encSetOut(i + (9*i) + 1, t);
		t += 30;
	}
	for (var i = 31; i < 39; i++) {
		encSetOut(i, t);
		t += 30;
	}
	for (var i = 28; i > 10; i -= 10) {
		encSetOut(i, t);
		t += 30;
	}
	for (var i = 17; i > 10; i--) {
		encSetOut(i, t);
		t += 30;
	}
	for (var i = 22; i < 28; i++) {
		encSetOut(i, t);
		t += 30;
	}
}

function encSetOut(i, t)
{
	setTimeout(function(){ encounter[i].style.backgroundColor = "black"; }, t);
}