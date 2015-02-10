var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			
			// First, see if we already hit here
			if (ship.hits[index] == "hit") {
				view.displayMessage("Oops, you already hit that location");
				return true;
			}
			// Otherwise, label it a hit
			else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("Hit!");
				// And see if the current ship is sunk
				if (this.isSunk(ship)) {
					view.displayMessage("You sank my something-ship!");
					this.shipsSunk++;
				}
				return true;
			}
			$('#guessInput').focus();
		} 
		// If nothing was hit, it was a miss
		view.displayMiss(guess);
		view.displayMessage("Missed!");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] != "hit") {
				return false;
			}
		}
		$('#guessInput').focus();
		return true;
	},

	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip(); 
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row;
		var col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} 
		else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];

		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} 
			else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		// When generating new ships, make sure they dont overlap
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};


var view = {
	// Send messages to the player, update hits/misses on screen
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
}


var controller = {
	// Main event handler
	guesses: 0,
	processGuess: function(guess) {
		var location = parseGuess(guess);

		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk == model.numShips) {
				view.displayMessage("You sank my ships in " + this.guesses + " turns.");
			}
		}
	}
}


function parseGuess(guess) {
	// Convert user input to a more computable format
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
				alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}


function handleFireButton() {
	// Take the text input guess, see if it's a hit, reset the input box
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();
	controller.processGuess(guess);
	guessInput.value = "";
}


function handleKeyPress(e) {
	// If you push enter, act as if you clicked the fire button
	var fireButton = document.getElementById("fireButton");
	e = e || window.event;
	if (e.keyCode == 13) {
		fireButton.click();
		return false;
	}
}


window.onload = init;
function init() {
	// Activate the Fire Button
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	// For older browsers, detect if the enter key is pushed
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;
	// Ships dont generate until after the first guess
	model.generateShipLocations();
}