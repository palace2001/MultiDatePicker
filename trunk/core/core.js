var dt = new Date();
var convertDateToText = ["일", "월", "화", "수", "목", "금", "토"];

function set_CurrentDate() {
    return dt.getDate();
}
function set_CurrentMonth() {
    return dt.getMonth() + 1;
}
function set_CurrentYear() {
    return dt.getFullYear();
}
function set_CurrentDay() {
    return dt.getDay();
}

function set_Today() {
	var index = dt.getDay();
	return convertDateToText[index];
}

function draw() {
	$(".multiDatePicker").append();
}