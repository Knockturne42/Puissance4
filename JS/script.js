var playerOne;
var soundOne;
var playerTwo;
var soundTwo;
var int = parseInt(prompt("Enter number of COLUMNS/LINE"));
var intDeux = int;
var player = document.getElementById('player');
var chooseBlock = document.getElementById('choose');
var playButton = document.getElementById('play');
var tableGame = init_tableJS(int, intDeux);
var playerTurn = 0;
var bigDivDisc = document.getElementById('divDisc');
var encounter = tabDivInit("e", 51, 1);
var encountDiv = document.getElementById("encounter");
var divDisc;
var pokeSound = document.getElementsByClassName("pokeSound");
var opening = document.getElementById('opening');
var playerOneDiv = document.getElementById('playerOne');
var playerTwoDiv = document.getElementById('playerTwo');
var shadow = document.getElementsByClassName('shadowPlayers');
var tableCol = document.getElementsByClassName('tableCol');
var select = document.getElementById('select');
var count = 0;
var countPlay = 0;
var score = document.getElementsByClassName('score');
var replayButton = document.getElementById('replayButton');
	replayButton.addEventListener("click", function(){resetBoard();});

function init_tableJS(int, intDeux) {
	table = []
	for (var i = 0; i < int; i++) {
		table[i] = []
		for (var j = 0; j < intDeux; j++) {
			table[i][j] = 0;
		}
	}
	return table;
}

function createCol(int, intDeux) {
	var i = 0
	for (i; i < int; i++) {
		var elem = document.createElement("DIV");
		elem.setAttribute("class", "tableCol");
		elem.setAttribute("id", "col" + i);
		bigDivDisc.appendChild(elem);
		elem.style.width = ""+((100 - int * 2) / int) + "%";
		createDiv(document.getElementById('col'+i), intDeux, count);
	}
	divDisc = tabDivInit("d", count, 0);
}

function createDiv(tableCol, int, num)
{
	for (var i = 0; i < int; i++) {
		var elem = document.createElement("DIV");
		elem.setAttribute("class", "divLigne");
		elem.setAttribute("id", "d" + (num + i));
		tableCol.appendChild(elem);
		elem.style.height = ""+((100 - int * 2) / int) + "%";
		count++;
	}
}

function discSet(i, j) {
	return function(){
		var index = 0;
		for (index; index < intDeux && !tableGame[i+index][j]; index++) {
		}
		if (index) {
			var pause = document.getElementById('pause');
			pause.style.display = "block";
			setTimeout(function(){ pause.style.display = "none";}, (index-1) * 200);
			if (playerTurn)	
			{
				divDisc[j * intDeux + index - 1].style.backgroundPosition = "0px -"+(600 * parseInt(divDisc[j * intDeux + index - 1].style.height) / 100)+"px";
				setTimeout(function(){ divDisc[j * intDeux + index - 1].style.backgroundImage = "url('"+playerOne+"')"; divDisc[j * intDeux + index - 1].style.backgroundPosition = "0px 0px"; divDisc[j * intDeux + index - 1].style.transitionDuration = "0.2s"; soundOne.play();}, (200 * (index-1)));
				tableGame[i + index - 1][j] = 2;
				slideDown(index - 1, j, playerOne)
				turnPlay();
				setTimeout(function(){resolution(tableGame)}, (index) * 200);
			}
			else
			{
				divDisc[j * intDeux + index - 1].style.backgroundPosition = "0px -"+(600 * parseInt(divDisc[j * intDeux + index - 1].style.height) / 100)+"px";
				setTimeout(function(){ divDisc[j * intDeux + index - 1].style.backgroundImage = "url('"+playerTwo+"')";  divDisc[j * intDeux + index - 1].style.backgroundPosition = "0px 0px"; divDisc[j * intDeux + index - 1].style.transitionDuration = "0.2s"; soundTwo.play();}, (200 * (index-1)));
				tableGame[i + index - 1][j] = 1;
				slideDown(index - 1, j, playerTwo);
				turnPlay();
				setTimeout(function(){resolution(tableGame)}, (index) * 200);
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
		effectSlide(divDisc[j * intDeux + index], player, index);
	}
}

function effectSlide(myDisc, player, i) {
	myDisc.style.backgroundPosition = "0px -"+(600 * parseInt(myDisc.style.height) / 100)+"px";
	myDisc.style.backgroundImage = "url('"+player+"')";
	setTimeout(function(){ setTimeout(function(){ myDisc.style.backgroundPosition = "0px "+(600 * parseInt(myDisc.style.height) / 100)+"px";
	myDisc.style.transitionDuration = "0.4s"; }, 200 * i); }, 1);
	setTimeout(function(){ myDisc.style.backgroundImage = "";
	myDisc.style.transitionDuration = "0s"; myDisc.style.backgroundPosition = "0px -"+(600 * parseInt(myDisc.style.height) / 100)+"px";}, (200 * i + 201));

}

function turnPlay(win)
{
	if(playerTurn == 0)
	{
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
	if(win)
	{
		playerTwoDiv.style.height = "250px";
		playerTwoDiv.style.width = "150px";
		playerOneDiv.style.height = "250px";
		playerOneDiv.style.width = "150px";
		shadow[1].style.width = "150px";
		shadow[1].style.height = "250px";
		shadow[0].style.width = "150px";
		shadow[0].style.height = "250px";
		setTimeout(function(){ shadow[1].style.display = "block"; }, 500);
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
					winLose(tableGame[i][j]);
			}
		}
	}
	countPlay++;
	if (countPlay == (int * intDeux))
	{
		console.log(tableGame);
		matchNull();
	}
}

function matchNull()
{
	var sound = document.getElementById('pokeBattle');
	sound.pause();
	var soundResult = document.getElementById('matchNull');
	soundResult.play();
	var resultat = document.getElementById('egal');
	resultat.style.display = "flex";
	turnPlay(1);
	setTimeout(function(){
		replay();
	}, 5000);
}

function winLose(playerWin)
{
	var sound = document.getElementById('pokeBattle');
	sound.pause();
	var soundResult = document.getElementById('victory');
	soundResult.play();
	var resultat = document.getElementById('result');
	result.style.display = "flex";
	var resuP = document.getElementsByClassName("resuP");
	var win = document.getElementById("win");
	var lose = document.getElementById("lose");
	var divRes = document.getElementsByClassName('resu');
	turnPlay(1);
	if (playerWin == 2) {
		resuP[0].innerHTML = "Joueur 1 Win";
		resuP[1].innerHTML = "Joueur 2 Lose";
		win.style.backgroundImage = "url('"+playerOne+"')";
		divRes[0].style.backgroundColor = "rgba(225, 38, 38, 0.5)";
		lose.style.backgroundImage = "url('"+playerTwo+"')";
		divRes[1].style.backgroundColor = "rgba(38, 38, 225, 0.5)";
		score[0].innerHTML = parseInt(score[0].innerHTML) + 1;
	}
	else {
		resuP[0].innerHTML = "Joueur 2 Win";
		resuP[1].innerHTML = "Joueur 1 Lose";
		win.style.backgroundImage = "url('"+playerTwo+"')";
		divRes[0].style.backgroundColor = "rgba(38, 38, 225, 0.5)";
		lose.style.backgroundImage = "url('"+playerOne+"')";
		divRes[1].style.backgroundColor = "rgba(225, 38, 38, 0.5)";
		score[1].innerHTML = parseInt(score[1].innerHTML) + 1;
	}
	setTimeout(function(){
		replay();
	}, 5000);
}

function replay() {
	var replayDiv = document.getElementById('replay');
	replayDiv.style.display = "flex";
}

function resetBoard(){
	int = parseInt(prompt("Enter number of COLUMNS/LINE"));
	intDeux = int;
	tableGame = init_tableJS(int, intDeux);
	playerOne = 0;
	playerTwo = 0;
	main = document.getElementById('main');
	main.removeChild(bigDivDisc);
	bigDivDisc = document.createElement('DIV');
	bigDivDisc.setAttribute("id", "divDisc");
	main.insertBefore(bigDivDisc, document.getElementById('egal'));
	var replayDiv = document.getElementById('replay');
	replayDiv.style.display = "none";
	var resultat = document.getElementById('result');
	result.style.display = "none";
	var egal = document.getElementById('egal');
	egal.style.display = "none";
	var soundResult = document.getElementById('victory');
	audio = document.getElementsByTagName('audio');
	for (var i = 0; i < audio.length; i++) {
		audio[i].pause();
		audio[i].load();
	}
	count = 0;
	countPlay = 0;
	var replayButton = document.getElementById('replayButton');
	replayButton.removeEventListener("click", function(){resetBoard();}	);
	playGame();
}

function resHorizon(tableGame, i, j, valTab) {
	for (var index = 0; index < 4 && j < (tableGame[i].length - 3); index++) {
		if(valTab != tableGame[i][j + index])
			return(0);
		else
		{
			if (index+1 == 4) {
				return(tableGame[i][j]);
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
				return(tableGame[i][j]);
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
				return(tableGame[i][j]);
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
				return(tableGame[i][j]);
			}
		}
	}
	return(0);
}

function playGame() {
	createCol(int, intDeux);
	opening.play();
	playButton.addEventListener("click", function(){
		if (!playerOne) {
			chooseBlock.style.display = "flex";
			opening.pause();
			var audio = document.getElementById('chooseSound');
			audio.play();
			setDisc(playerOne, playerTwo);
		}
	});
}

function setDisc(playerOne, playerTwo) {
	var choice = document.getElementsByClassName('discChoose');
	for (var i = 0; i < choice.length; i++) {
		(function(index, playerOne, playerTwo){
			choice[index].addEventListener("click", function() {
				select.play();
				setTimeout(function(){
					logoPlayer(choice[index], pokeSound[index]);
					pokeSound[index].play();
				},500);
			})
		})(i);
	}
}

function logoPlayer(choice, pokeSound) {
	if (!playerOne)
	{
		player.style.transitionDuration = "1s";
		playerOne = choice.src;
		soundOne = pokeSound;
		var playerOneDivImg = document.getElementById('playerOneImg');
		playerOneDivImg.style.backgroundImage = "url('"+playerOne+"')";
		player.innerHTML = "Joueur 2";
		player.style.backgroundColor = "rgba(27, 33, 233, 0.5)"
		choice.style.border = "1px solid rgb(225, 38, 38)";
		choice.style.backgroundColor = "rgba(225, 38, 38, 0.5)";
	}
	else if (!playerTwo && playerOne != choice.src)
	{
		playerTwo = choice.src;
		soundTwo = pokeSound;
		var playerTwoDivImg = document.getElementById('playerTwoImg');
		playerTwoDivImg.style.backgroundImage = "url('"+playerTwo+"')";
		var playerOneDivImg = document.getElementById('playerOneImg');
		choice.style.border = "1px solid rgb(27, 33, 233)";
		choice.style.backgroundColor = "rgba(27, 33, 233, 0.5)";
		setTimeout(function(){ chooseBlock.style.display = "none"; player.innerHTML = "Joueur 1"; player.style.backgroundColor = "#E12626"}, 5500);
		setTimeout(function(){choice = document.getElementsByClassName('discChoose');
		for (var i = 0; i < choice.length; i++) {
			choice[i].style.border = "1px solid rgba(0, 0, 0, 0)";
			choice[i].style.backgroundColor = "rgba(0, 0, 0, 0)";
		}}, 5500);
		player.innerHTML = "3";
		player.style.backgroundColor = "rgba(69, 75, 237, 0.5)";
		setTimeout(function(){ player.innerHTML = "2"; player.style.backgroundColor = "rgba(116, 120, 241, 0.5)";}, 1000);
		setTimeout(function(){ player.innerHTML = "1"; player.style.backgroundColor = "rgba(162, 165, 246, 0.5)"; }, 2000);
		setTimeout(function(){ player.innerHTML = "0"; player.style.backgroundColor = "rgba(209, 210, 250, 0.5)"; }, 3000);
		setTimeout(function(){ encountStart(); }, 3000);
		setTimeout(function(){var audio = document.getElementById('pokeBattle');
		audio.play(); audio.loop = "true";}, 2200)
		setTimeout(function(){chooseSound = document.getElementById('chooseSound'); chooseSound.pause();}, 3200);
	}
	else {
	}
}
playGame();




//css pour animation combat debut.

function tabDivInit(val, max, i) {
	var array = [];
	for (i; i < max; i++) {
		array.push(document.getElementById(val+i));
	}
	return(array);
}


function encountStart() {
	encountDiv.style.display = "flex";
	encountFlash();
	encountAction();
	setTimeout(function(){ encountDiv.style.display = "none";}, 2600);
	setTimeout(function(){ turnPlay(); init_table();}, 2600);
	setTimeout(function() {
		for (var i = 0; i < encounter.length; i++) {
			encounter[i].style.backgroundColor = "rgba(0, 0, 0, 0)";
		}
	}, 2600)
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