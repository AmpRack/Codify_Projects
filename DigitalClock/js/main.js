function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	else if (i == 0) {
		i = 1 + i;
	}
	return i;
}

function startTime() {
	var currentTime = new Date();
	var separator = ":"

/* Remove this first bit to convert to 24hr clock */
	if (currentTime.getHours() > 12) {
		var hrs = currentTime.getHours() - 12;
	} else {
		var hrs = currentTime.getHours();
	}
	var mins = currentTime.getMinutes();
	var secs = currentTime.getSeconds();
	
/* Secondly blinking */
	if (secs % 2 == 1) {
		separator = " ";
		document.getElementById('clock').style.border = "2px solid #05E9FF";
		document.getElementById('clock').style.padding = "23px";
	} else {
		separator = ":";
		document.getElementById('clock').style.border = "6px solid #05E9FF";
		document.getElementById('clock').style.padding = "19px";
	}

/* Hourly Chime */
	if (mins + secs >= 118) {
		document.getElementById('clock_bg').style.background = "#05E9FF";
	}
	if (mins + secs <= 2) {
		document.getElementById('clock_bg').style.background = "#000000";
	}

/* Adjust time for display, print, and restart */
	hrs = checkTime(hrs);
	mins = checkTime(mins);
	secs = checkTime(secs);

	document.getElementById('clock').innerHTML = hrs + separator + mins + separator + secs;
	
	setTimeout(function() {
		startTime()
	}, 1000);
}

