var playerOne;
var playerTwo;
var player = document.getElementById('player');
var chooseBlock = document.getElementById('choose');
var playButton = document.getElementById('play');

function playGame() {
	playButton.addEventListener("click", function(){
		if (!playerOne) {
			chooseBlock.style.display = "block";
			setDisc(playerOne, playerTwo);
		}
	});
}

/*function displaySetDisc(playerOne, playerTwo) {
	if (!playerOne) {
		chooseBlock.style.display = "block";
		setDisc(playerOne, playerTwo);
	}
}*/

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
		console.log(playerOne);
		choice.style.backgroundColor = "rgba(200, 250, 50, 1)";
	}
	else if (!playerTwo)
	{
		playerTwo = choice.src;
		console.log(playerTwo);
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