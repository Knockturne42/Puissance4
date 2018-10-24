var playerOne;
var playerTwo;

function chooseDisc(playerOne, playerTwo) {
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
		console.log(playerOne);
		choice.style.backgroundColor = "rgba(200, 250, 50, 1)";
	}
	else if (!playerTwo)
	{
		playerTwo = choice.src;
		console.log(playerTwo);
		choice.style.backgroundColor = "rgba(50, 250, 200, 1)";
	}
	else {
	}
}

chooseDisc()