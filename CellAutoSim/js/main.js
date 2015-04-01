// Cellular Automata Simulator
// (Based on Conway's Game of Life, http://en.wikipedia.org/wiki/Conway's_Game_of_Life )
// All code by Rob.Hill@gmail.com

var $controller = new Object();


function initSettings() {
	$controller = {
		running: true,
		horz: $(window).width(),
		vert: $(window).height(),
		cellSize: $('#cell-size').val(),
		colorTheme: $('#color-theme').val(),
		ruleSet: $('#rule-set').val(),
		animStyle: $('#anim-style').val(),
		delay: $('#delay-speed').val(),
		randSeed: $.now(),
		chance: 10
	}
	$controller.grid = gridStarter($controller.randSeed);
	$controller.gridNext = $controller.grid;
}


// Generates the initial randomized grid
function gridStarter(seed) {
	var xMax = Math.floor(($controller.horz / $controller.cellSize) + 0); //  0 works, 1 breaks
	var yMax = Math.floor(($controller.vert / $controller.cellSize) + 0); //  But it needs to be 1 !!
	var random = Math.floor(Math.random() * seed);
	var chance = $controller.chance;
	var tempArray = new Array();
	var outputArray = new Array();

	for (var y = 0; y < yMax; y++) {
		tempArray = [];
		for (var x = 0; x < xMax; x++) {
			random = Math.floor(Math.random() * seed);
			if ((random % 100) <= chance) {
				tempArray[x] = 1;
				$('#x'+x+'y'+y).addClass('active');
			} else {
				tempArray[x] = 0;
			}
		}
		outputArray[y] = tempArray;
	}
	return outputArray;
}


// Adds the html cells to the page
function htmlGenerator(grid) {
	var xMax = grid[0].length;
	var yMax = grid.length;

	for (var y = 0; y < yMax; y++) {
		for (var x = 0; x < xMax; x++) {
			if (x == 0) { // Each row gets its own 100% wide block
				$('#content-window').append('<div class="cell-row" />');
			}
			$('.cell-row:last-of-type').append($("<div />", { 
				class: "div-cell",
				id: 'x'+x+'y'+y, 
				x: x,
				y: y
			}));
			$('#x'+x+'y'+y).append(' ');
			if (x + 1 == xMax) { // The last element holds a line break
				$('.cell-row:last-of-type').append("<br />");
			}
		}
	}
}


// Read array and activate the appropriate cells
function updateCellState(grid) {
	for (var y = 0; y < grid.length; y++) {
		for (var x = 0; x < grid[0].length; x++) {
			if (grid[y][x] == 0) {
				$('#x'+x+'y'+y).removeClass('active');
			} else if (grid[y][x] == 1) {
				$('#x'+x+'y'+y).addClass('active');
			} else {
				console.log('updateCellState Failed! x=' +x+ ' y=' +y+ ' state=' + grid[y][x]);
				continue;
			}
		}
	}
}


// A search range is set, go through the squares and count up the number of active tiles
function checkNeighbors(range) {
	var totalActive = 0;

	$.each($controller.grid.slice(range.yLower, range.yUpper + 1), function(y, horizontal) {
		$.each(horizontal.slice(range.xLower, range.xUpper + 1), function(x, tile) {
			if (tile == 1) {
				totalActive += 1;
			}
		});
	});
	return totalActive;
}


// Check each tile according to the specified rules, then push to gridNext
function determineNextGrid(grid) {
	var activeNeighbors = 0;
	var boundaries = {			// When checking the array, make sure we stay in bounds
		xLower: 0, xUpper: 0,
		yLower: 0, yUpper: 0
	};

	$.each(grid, function(y, horizontal) {
		$.each(horizontal, function(x, tile) {

			// Set the search area boundaries first, then send boundaries to be checked
			// The number returned determines the changes for the next step
			if ($controller.ruleSet == 'rules-conway') { // The original Game of Life rules
				if ((x - 1) < 0) { 
					boundaries.xLower = 0; 
				} else { 
					boundaries.xLower = (x - 1);	
				}

				if ((y - 1) < 0) {
					boundaries.yLower = 0;
				} else {
					boundaries.yLower = (y - 1);
				}

				if ((x + 1) >= grid[0].length) {
					boundaries.xUpper = x;
				} else {
					boundaries.xUpper = (x + 1);
				}

				if ((y + 1) >= grid.length) {
					boundaries.yUpper = y;
				} else {
					boundaries.yUpper = (y + 1);
				}

				// If tile is active, it got counted so ignore it
				activeNeighbors = checkNeighbors(boundaries);
				if (tile == 1 && activeNeighbors > 0) { 
					activeNeighbors -= 1; 
				}
				//console.log('Tile at ' + x + ',' + y + ' has ' + activeNeighbors + ' active neighbors.');

				if (tile == 1 && activeNeighbors < 2) {
					$controller.gridNext[y][x] = 0; // Underpopulation decay
				} else if (tile == 1 && activeNeighbors > 3) {
					$controller.gridNext[y][x] = 0; // Overpopulation decay
				} else if (tile === 0 && activeNeighbors != 3) {
					$controller.gridNext[y][x] = 0; // Inactive areas stay inactive
				} else {
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


// User-forced state changes, computed in the next cycle
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


// See if anything is different, then change it before generating another grid.
function getUserChanges() {
	if ($controller.colorTheme != $('#color-theme').val()) $controller.colorTheme = $('#color-theme').val();
	if ($controller.ruleSet    != $('#rule-set').val())    $controller.ruleSet    = $('#rule-set').val();
	if ($controller.animStyle  != $('#anim-style').val())  $controller.animStyle  = $('#anim-style').val();
	if ($controller.delay      != $('#delay-speed').val()) $controller.delay      = $('#delay-speed').val();
}


// The main processing loop
function runSimulator() {
	if ($controller.running) {
		window.setTimeout("runSimulator()", $controller.delay);
		updateCellState($controller.grid);
		getUserChanges();
		determineNextGrid($controller.grid);
	}
}


$(document).ready(function() {	
	initSettings();
	htmlGenerator($controller.grid);
	$('.div-cell').click(function() {
		tileToggle($(this));
	});
	runSimulator();
});



/* Resizing: 
	If window is bigger than the last frame, generate arrays (or length of the subsequent arrays) to fill up the space (dont need to be activated)
	If window is smaller than last time, destroy arrays (or parts of). 
		Maybe we can save the info though? Maybe its not worth it, it's only valid for 1 frame.
	Actually, it's better than that. The GridArray stays intact, we have to destroy the divs
		So... On resize, see how many divs there SHOULD be (windowsize/cellsize + 1)
		Then, look through divs by their X and Y properties, starting at the end (current cell count)
			If ShouldHave > Current, add the right bits
			If ShouldHave < Current, destroy some bits
	...Actually no, BOTH need to be updated at the same time.

*/