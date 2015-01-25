function convertTimeToMinutes (time) {
	time = time.replace(/[: ]/g, "");

	var isPM = /pm/gi.test(time);
	var is12 = false;
	if (time.length > 5) is12 = /^12/gi.test(time);

	if (is12 && isPM) {
		time = Number(time.replace(/pm/gi, ""));
	} else if (is12 && !isPM) {
		time = Number(time.replace(/am/gi, "")) - 1200;
	} else if (!is12 && isPM) {
		time = Number(time.replace(/pm/gi, "")) + 1200;
	} else {
		time = Number(time.replace(/am/gi, ""));
	};

	var r = time % 100;
	return (((time - r) / 100) * 60) + r;
};

function convertMinuteToTime (minutes) {
	var isPM = false;
	var r = minutes % 60;
	if (r > 0 && r < 10) r = "0" + r.toString()
	time = Number(((minutes - r) / 60).toString() + r.toString());
	if (r === 0) time *= 10
	if (time > 1159) isPM = true;
	if (time > 1259) time -= 1200;
	time = time.toString();
	time = time.slice(0, time.length - 2) + ":" + time.slice(time.length - 2, time.length);
	if (isPM) return time + "pm";
	return time + "am"
};

function breakTime (start, end) {
	start = convertTimeToMinutes(start);
	end = convertTimeToMinutes(end);
	var totalTime = end - start;
	var numOfPeriods = 2;
	if (totalTime > 4.5 * 60) numOfPeriods = 4;

	if (numOfPeriods === 4) totalTime -= 60;
	if (numOfPeriods === 2) totalTime -= 15;

	var idealPeriod = Math.floor(totalTime / numOfPeriods);

	var firstBreak = start + idealPeriod;
	if (start >= 13 * 60) {
		var secondBreak = firstBreak + 30 + idealPeriod;
		var thirdBreak = secondBreak + 15 + idealPeriod;
	} else {
		var secondBreak = firstBreak + 15 + idealPeriod;
		var thirdBreak = secondBreak + 30 + idealPeriod;
	};

	if (numOfPeriods === 2) return "break: " + convertMinuteToTime(firstBreak);
	return "first: " + convertMinuteToTime(firstBreak) + "<br />second: " + convertMinuteToTime(secondBreak) + "<br />third: " + convertMinuteToTime(thirdBreak);

};