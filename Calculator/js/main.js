var keys = document.querySelectorAll('#calculator span');
var operators = ["+", "-", "*", "/", "^2", "!"];
var decimalAdded = false;

for (var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		var input = document.querySelector('.screen-lcd');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;

		if (inputVal == 'Infinity') {
			input.innerHTML = '';
			inputVal += btnVal;
		}
		
		if (btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		else if (btnVal == '^2') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			if ((operators.indexOf(lastChar) > -1) || (lastChar == ".")) {
				equation = equation.replace(/.$/, '');
			}
			if (equation) {
				var temp = eval(equation);
				input.innerHTML = temp * temp;
			}
		}
		else if (btnVal == '!') {
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
					input.innerHTML = answer;
				}
			}
		}
		else if (btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];

			if ((operators.indexOf(lastChar) > -1) || (lastChar == ".")) {
				equation = equation.replace(/.$/, '');
			}
			if (equation) {
				input.innerHTML = eval(equation);
			}
			decimalAdded = false;
		}
		else {
			input.innerHTML += btnVal;
    	}
	}
}
