var playerOne;
var soundOne;
var playerTwo;
var soundTwo;
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
var bigDivDisc = document.getElementById('divDisc');
var encounter = tabDivInit("e", 51);
var encountDiv = document.getElementById("encounter");
var divDisc = tabDivInit("d", 50);
var pokeSound = document.getElementsByClassName("pokeSound");
var opening = document.getElementById('opening');
var playerOneDiv = document.getElementById('playerOne');
var playerTwoDiv = document.getElementById('playerTwo');
var shadow = document.getElementsByClassName('shadowPlayers');
var tableCol = document.getElementsByClassName('tableCol');

function discSet(i, j) {
	return function(){
		var index = 0

		for (index; index < tableGame.length && !tableGame[i+index][j]; index++) {
		}
		if (index) {
			console.log(index);
			if (playerTurn)	
			{
				setTimeout(function(){ divDisc[j * 7 + index - 1].style.backgroundImage = "url('"+playerOne+"')"; divDisc[j * 7 + index - 1].style.backgroundPosition = "0px 0px"; divDisc[j * 7 + index - 1].style.transitionDuration = "0.4s"; soundOne.play();}, (200 * (index-1)));
				tableGame[i + index - 1][j] = 2;
				slideDown(index - 1, j, playerOne)
				turnPlay();
				resolution(tableGame);
			}
			else
			{
				setTimeout(function(){ divDisc[j * 7 + index - 1].style.backgroundImage = "url('"+playerTwo+"')";  divDisc[j * 7 + index - 1].style.backgroundPosition = "0px 0px"; divDisc[j * 7 + index - 1].style.transitionDuration = "0.4s"; soundTwo.play();}, (200 * (index-1)));
				tableGame[i + index - 1][j] = 1;
				slideDown(index - 1, j, playerTwo)
				turnPlay();
				resolution(tableGame)
			}
		}
	}
}

function init_table() {
	for (var i = 0; i < tableCol.length; i++) {
		tableCol[i].addEventListener("click", discSet(0, i));
	}
}

function slideDown(i, j, player) {
	for (var index = 0; index < i; index++) {
		effectSlide(divDisc[j * 7 + index], player, index);
	}
}

function effectSlide(myDisc, player, i) {
	myDisc.style.backgroundImage = "url('"+player+"')";
	setTimeout(function(){ setTimeout(function(){ myDisc.style.backgroundPosition = "0px 60px";
	myDisc.style.transitionDuration = "0.4s"; }, 200 * i); }, 1);
	setTimeout(function(){ myDisc.style.backgroundImage = "";
	myDisc.style.transitionDuration = "0s"; myDisc.style.backgroundPosition = "0px -60px";}, (200 * i + 201));

}

// function init_table(playerOne, playerTwo, tableGame)
// {
// 	for(var i = 0; i < divDisc.length; i++) {
//        divDisc[i].addEventListener("click", backgroundIco(i, playerOne, playerTwo, tableGame));
// 	}
// }

// function backgroundIco(i, playerOne, playerTwo, tableGame) {
//     return function() {
//     	if (playerTurn == 0)
//     	{
//     		soundOne.play();
//         	divDisc[i].style.backgroundImage = "url('"+playerOne+"')";
//         	tableGame[i % (tableGame.length)][Math.floor(i / (tableGame.length))] = 1;
//     	}
//         else
//         {
//         	soundTwo.play();
//         	divDisc[i].style.backgroundImage = "url('"+playerTwo+"')";
//         	tableGame[i % (tableGame.length)][Math.floor(i / (tableGame.length))] = 2;
//     	}
//     	console.log(tableGame);
//     	turnPlay();
//     	resolution(tableGame);
//     };
// }

function turnPlay()
{
	if(playerTurn == 0)
	{
		console.log("Joueur 1");
		playerTurn = 1;
		playerOneDiv.style.height = "300px";
		playerOneDiv.style.width = "200px";
		playerTwoDiv.style.height = "250px";
		playerTwoDiv.style.width = "150px";
		shadow[0].style.width = "200px";
		shadow[0].style.height = "300px";
		shadow[1].style.width = "150px";
		shadow[1].style.height = "250px";
		setTimeout(function(){ shadow[0].style.display = "none"; }, 500);
		setTimeout(function(){ shadow[1].style.display = "block"; }, 500);
	}
	else
	{
		console.log("Joueur 2");
		playerTurn = 0;
		playerOneDiv.style.height = "250px";
		playerOneDiv.style.width = "150px";
		playerTwoDiv.style.height = "300px";
		playerTwoDiv.style.width = "200px";
		shadow[1].style.width = "200px";
		shadow[1].style.height = "300px";
		shadow[0].style.width = "150px";
		shadow[0].style.height = "250px";
		setTimeout(function(){ shadow[1].style.display = "none"; }, 500);
		setTimeout(function(){ shadow[0].style.display = "block"; }, 500);
	}
}

function resolution(tableGame) {
	for (var i = 0; i < tableGame.length; i++) {
		for (var j = 0; j < tableGame[i].length; j++) {
			if (tableGame[i][j] != 0) {
				var h = resHorizon(tableGame, i, j, tableGame[i][j]);
				var v = resVertic(tableGame, i, j, tableGame[i][j]);
				var d = resDiago(tableGame, i, j, tableGame[i][j]);
				var dTwo = resDiagoTwo(tableGame, i, j, tableGame[i][j])
				if (h || v || d || dTwo)
				{
					console.log("h: "+h+" v: "+v+" d: "+d+" dTwo: "+dTwo);
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

function resDiagoTwo(tableGame, i, j, valTab) {
	for (var index = 0; index < 4 && j > 2 && i < (tableGame[i].length - 3); index++) {
		if(valTab != tableGame[i + index][j - index])
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
	});
}

function setDisc(playerOne, playerTwo) {
	var choice = document.getElementsByClassName('discChoose');
	for (var i = 0; i < choice.length; i++) {
		(function(index, playerOne, playerTwo){
			choice[index].addEventListener("click", function() {
				logoPlayer(choice[index], pokeSound[index]);
				pokeSound[index].play();
			})
		})(i);
	}
}

function logoPlayer(choice, pokeSound) {
	if (!playerOne)
	{
		playerOne = choice.src;
		soundOne = pokeSound;
		var playerOneDivImg = document.getElementById('playerOneImg');
		playerOneDivImg.style.backgroundImage = "url('"+playerOne+"')";
		player.innerHTML = "Joueur 2";
		player.style.backgroundColor = "rgba(50, 250, 200, 1)"
		choice.style.backgroundColor = "rgba(200, 250, 50, 1)";
	}
	else if (!playerTwo)
	{
		playerTwo = choice.src;
		soundTwo = pokeSound;
		var playerTwoDivImg = document.getElementById('playerTwoImg');
		playerTwoDivImg.style.backgroundImage = "url('"+playerTwo+"')";
		choice.style.backgroundColor = "rgba(50, 250, 200, 1)";
		setTimeout(function(){ chooseBlock.style.display = "none"; }, 5500);
		player.style.backgroundColor = "grey";
		player.innerHTML = "3";
		setTimeout(function(){ player.innerHTML = "2"; }, 1000);
		setTimeout(function(){ player.innerHTML = "1"; }, 2000);
		setTimeout(function(){ player.innerHTML = "0"; }, 3000);
		setTimeout(function(){ encountStart(); }, 3000);
		setTimeout(function(){var audio = document.getElementById('pokeBattle');
		audio.play(); audio.loop = "true";}, 2200)
		setTimeout(function(){opening.pause();}, 3200);
		// init_table(playerOne, playerTwo, tableGame);
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
	setTimeout(function(){ turnPlay(); init_table();}, 3600);
}

function encountFlash() {
	encountDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; }, 166);
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; }, 332);
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; }, 498);
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; }, 664);
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; }, 830);
	setTimeout(function(){ encountDiv.style.backgroundColor = "rgba(255, 255, 255, 0)"; }, 996);
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

// chrome://flags/#autoplay-policy