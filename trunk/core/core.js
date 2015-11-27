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

function get_FirstDay(){
	var d = new Date(set_CurrentYear(),set_CurrentMonth()-1,1);
	return d.getDay();
}

function get_LastDay(){
	var d = new Date(set_CurrentYear(),set_CurrentMonth()-1,get_day_max(set_CurrentYear(),set_CurrentMonth()-1));
	return d.getDay();
}

function get_day_max(year,month){
	var i = 29, cday;
	while(i<32){
		cday = new Date(year,month,i);
		if (cday.getFullYear()!=year || cday.getMonth()!=month) break;
		i++;
	}
	return i-1;
}

function draw() {
	var firstDay = 1;
	for(firstDay+get_FirstBlack() ; firstDay<=get_day_max(set_CurrentYear(),set_CurrentMonth()) ; firstDay++){
		console.log(firstDay);
		if(j%7==0){
			console.log("<br>");
		}
	}
}

function get_FirstBlack(){
	return get_FirstDay();
}

function get_LastBlack(){
	if(get_LastDay()!=0){
		return 6-get_lastDay();
	}
	return 0;
}

$(".day").bind("click", function(e){
	var pickeddate = $(this).attr("dateValue");
});
