/* Move content down the screen after each equation/evaluation */
function lineShift() {
	line5.innerHTML = line4.innerHTML;
	line4.innerHTML = line3.innerHTML;
	line3.innerHTML = line2.innerHTML;
	line2.innerHTML = line1.innerHTML;
	line1.innerHTML = '';
}

var keys = document.querySelectorAll('#calculator span');
var operators = ["+", "-", "*", "/", "^2", "!"];
var decimalAdded = false;

for (var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		var line1 = document.getElementById('line1');
		var line2 = document.getElementById('line2');
		var line3 = document.getElementById('line3');
		var line4 = document.getElementById('line4');
		var line5 = document.getElementById('line5');
		var inputVal = line1.innerHTML;
		var btnVal = this.innerHTML;

		/* Infinity should count as the end of the equation */
		if (inputVal == 'Infinity') {
			lineShift();
			inputVal += btnVal;
		}
		
		/* Clear ALL lines */
		if (btnVal == 'C') {
			line1.innerHTML = '';
			line2.innerHTML = '';
			line3.innerHTML = '';
			line4.innerHTML = '';
			line5.innerHTML = '';
			decimalAdded = false;
		}
		/* Value Squared */
		else if (btnVal == '^2') {
			line1.innerHTML += btnVal;
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			if ((operators.indexOf(lastChar) > -1) || (lastChar == ".")) {
				equation = equation.replace(/.$/, '');
			}
			if (equation) {
				var temp = eval(equation);
				lineShift();
				line1.innerHTML = temp * temp;
			}
		}
		/* Value Factorial */
		else if (btnVal == '!') {
			line1.innerHTML += btnVal;
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			if ((operators.indexOf(lastChar) > -1) || (lastChar == ".")) {
				equation = equation.replace(/.$/, '');
			}
			if (equation) {
				var temp = eval(equation);
				var answer = 1;
				if (temp > 1) {
					while (temp > 1) {
						answer *= temp;
						temp -= 1;
					}
					lineShift();
					line1.innerHTML = answer;
				}
			}
		}
		/* Solve the problem */
		else if (btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];

			if ((operators.indexOf(lastChar) > -1) || (lastChar == ".")) {
				equation = equation.replace(/.$/, '');
			}
			if (equation) {
				lineShift();
				line1.innerHTML = eval(equation);
			}
			decimalAdded = false;
		}
		/* Otherwise, push it to the screen */
		else {
			line1.innerHTML += btnVal;
    	}
	}
}
