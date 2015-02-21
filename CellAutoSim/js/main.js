// Cellular Automata Simulator
// (Based on Conway's Game of Life, http://en.wikipedia.org/wiki/Conway's_Game_of_Life )

// Fill the screen with a grid, randomly activate some of the cells,
// and following the rules of CGoL, generate a new grid. Animate the
// transition between states. All state-changes should happen at the same
// time. 

// Holds everything that needs to get passed around
var $controller = new Object();

//On load, grab all the default settings and load them into the $controller
function initSettings() {
	$controller.horz = $(window).width();
	$controller.vert = $(window).height();
	$controller.cellSize = 30; 				// This is just a default, link to a slider
	$controller.colorTheme = $('#color-theme').val();
	$controller.ruleSet = $('#rule-set').val();
	$controller.animStyle = $('#anim-style').val();
	$controller.delay = $('#delay-speed').val();
	$controller.grid = new Array();			// Hold the 'current' grid we're looking at
	$controller.gridNext = gridPopulator(); // This is the 'next' grid to be examined
	$controller.running = true; 			// Running or Paused?

	// Generates the div-cells to html
	// NOTE: Can probably do this in the gridPopulator, once it gets fixed
	$.each($controller.gridNext, function(j, horizontal) {
		$.each(horizontal, function(i, tile) {
			$('#content-window').append($("<div />", { 
				class: "div-cell",
				id: 'x'+i+'y'+j, 
				x: i,
				y: j
			}));
			$('#'+'x'+i+'y'+j).append(' ');
			if (tile == 1) {
				$('#'+'x'+i+'y'+j).addClass('active');
			}
		});
	});
}

// Generates a random array grid
function gridPopulator() {
	var x = Math.floor($controller.horz / $controller.cellSize);
	var y = Math.floor($controller.vert / $controller.cellSize);
	var random = Math.floor(Math.random() * $controller.randSeed);
	var tempArray = new Array();
	var outputArray = new Array();
	$controller.randSeed = $.now();

	// If theres no specific seed, just grab one

	for (var j = 0; j < y; j++) {
	console.log('Test');
		tempArray = [];
		for (var i = 0; i < x; i++) {
			// There's a 20% chance of rolling an active cell
			random = Math.floor(Math.random() * $controller.randSeed);
			if ((random % 100) <= 20) {
				tempArray[i] = 1;
			}
			else {
				tempArray[i] = 0;
			}
		}
		outputArray[j] = tempArray;
	}
	return outputArray;
}


// Iterate through the grid, in the given boundaries and count active classes
function checkNeighbors(range) {
	var totalActive = 0;
	console.log(range);

	$.each($controller.grid.slice(range.yLower, range.yUpper + 1), function(y, horizontal) {
		$.each(horizontal.slice(range.xLower, range.xUpper + 1), function(x, tile) {
			console.log(x + ',' + y + ' = ', + tile);
			if (tile == 1) {
				totalActive += 1;
			}
		});
	});
	return totalActive;
}

// Iterate through the grid, check each tile according to the specified rules.
// Then create a new grid to store the output
function determineGridNext() {

	// Load the next grid into place
	$controller.grid = $controller.gridNext;

	var activeNeighbors = 0;	// How many adjacent tiles are active
	var boundaries = {			// When checking the array, make sure we stay in bounds
		xLower: 0,
		xUpper: 0,
		yLower: 0,
		yUpper: 0
	};


	$.each($controller.grid, function(y, horizontal) {
		$.each(horizontal, function(x, tile) {

			// Set the search area boundaries first, then send boundaries to be checked
			// The number returned determines the changes for the next step
			if ($controller.ruleSet == 'rules-conway') { // The original Game of Life rules
				if (x <= 0) { 
					boundaries.xLower = 0; 
				} else { 
					boundaries.xLower = (x - 1);	
				}

				if (y <= 0) {
					boundaries.yLower = 0;
				} else {
					boundaries.yLower = (y - 1);
				}

				if (x >= $controller.grid[y].length - 1) {
					boundaries.xUpper = x;
				} else {
					boundaries.xUpper = (x + 1);
				}

				if (y > $controller.grid.length) {
					boundaries.yUpper = y;
				} else {
					boundaries.yUpper = (y + 1);
				}

				
				// If tile is active, it got counted so ignore it
				activeNeighbors = checkNeighbors(boundaries);
				if (tile == 1 && activeNeighbors > 0) { 
					activeNeighbors -= 1; 
				}
				console.log('Tile at ' + x + ',' + y + ' has ' + activeNeighbors + ' active neighbors.');

				if (tile == 1 && activeNeighbors < 2) {
					$controller.gridNext[y][x] = 0; // Underpopulation decay
				}
				else if (tile == 1 && activeNeighbors > 3) {
					$controller.gridNext[y][x] = 0; // Overpopulation decay
				}
				else if (tile === 0 && activeNeighbors != 3) {
					$controller.gridNext[y][x] = 0; // Inactive areas stay inactive
				}
				else {
					$controller.gridNext[y][x] = 1; // Growth
				}

			}
			else if ($controller.ruleSet == 'rules-custom1') {
				// No custom rules yet
			}
			else if ($controller.ruleSet == 'rules-custom2') {
				// No custom rules yet
			}
		});
	});
}

// User-forced changes, computed in the next cycle
function tileToggle(tile) {
	var x = tile.attr('x');
	var y = tile.attr('y');

	if (tile.hasClass('active')) {
		$controller.gridNext[y][x] = 0;
	} else {
		$controller.gridNext[y][x] = 1;
	}
	tile.toggleClass('active');
}

// See if anything is different, then change it before doing anything else.
function getUserChanges() {
	if ($controller.colorTheme != $('#color-theme').val()) $controller.colorTheme = $('#color-theme').val();
	if ($controller.ruleSet    != $('#rule-set').val())    $controller.ruleSet    = $('#rule-set').val();
	if ($controller.animStyle  != $('#anim-style').val())  $controller.animStyle  = $('#anim-style').val();
	if ($controller.delay      != $('#delay-speed').val()) $controller.delay      = $('#delay-speed').val();
}

function runSimulator() {
	getUserChanges();
	determineGridNext();
}


$(document).ready(function() {	
	initSettings();
	runSimulator();

	$('.div-cell').click(function() {
		tileToggle($(this));
	});
});