var convertDateToText = ["일", "월", "화", "수", "목", "금", "토"];
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();

var clickedYear;
var selectedDate = [];
var selectedMonth = [];
var selectedYear = [];

$(document).ready(function(){
	draw();
	$("#prev").bind("click", function(){
		prevButton();
	});
	$("#next").bind("click", function(){
		nextButton();
	});
	$("#today").bind("click", function(){
		todayButton();
	});
});

function set_Today() {
	var index = dt.getDay();
	return convertDateToText[index];
}

function get_FirstDay(){
	var d = new Date(year,month-1,1);
	return d.getDay();
}

function get_LastDay(){
	var d = new Date(year,month-1,get_day_max(year,month-1));
	return d.getDay();
}

function get_day_max(year,month){
	var i = 29, cday;
	while(i < 32){
		cday = new Date(year,month,i);
		if (cday.getFullYear()!=year || cday.getMonth()!=month) break;
		i++;
	}
	return i-1;
}

function draw() {
	var firstDay = get_FirstDay() + 1;

	var str = draw_prevBlank();

	var dateNum = 1;
	for(firstDay; dateNum <= get_day_max(year,month-1) ; firstDay++){
		str += '<li class="date" dateValue="' + year + '-' + month + '-' + dateNum + '">' + dateNum + '</li>';
		if(firstDay%7==0){
			str += '</ul><ul class="row">';
		}
		dateNum++;
	}

	str += draw_LastBlank();

	$("#year").empty().append(year);
	$("#month").empty().append(month);
	$("#content").empty().append(str);
	bindingClickEvent();
}

function draw_prevBlank(){
	var str = '<ul class="row">';
	for (var i = 0; i < get_FirstDay(); i++) {
		str += '<li class="date"> . </li>';
	}
	return str;
}

function get_LastBlank(){
	if(get_LastDay()!=0){
		return 6-get_LastDay();
	}
	return 6;
}

function draw_LastBlank(){
	var str = '';
	for (var i = 0; i < get_LastBlank(); i++) {
		str += '<li class="date"> . </li>';
	}
	str += '</ul>';
	return str;
}

function prevButton(){
	if(month != 1)
	{
		month --;
	}else{
		year --;
		month = 12;
	}
	draw();
}

function todayButton(){
	year = today.getFullYear();
	month = today.getMonth() + 1;
	day = today.getDate();
	draw();
}

function nextButton(){
	if(month != 12)
	{
		month ++;
	}else{
		year ++;
		month = 1;
	}
	draw();
}

function pushSelectedDate(pickeddate){
	if(checkDuplicationData(pickeddate)){
		//중복시 어떻게 이벤트를 발생시킬지 고민해봅시다.
	}else{
		selectedDate.push(pickeddate);
		console.log(selectedDate);
	}
}

function checkDuplicationData(pickeddate){
	for (var i = 0; i < selectedDate.length; i++) {
		if(selectedDate[i] == pickeddate){
			return true;
		}
	}
	return false;
}

function bindingClickEvent(){
	$(".date").bind("click", function(e){	
		pushSelectedDate($(this).attr("dateValue"));
	});
}

//drawing functions area

function setRowHeight(){
	$(".date").each(function(){
		var row = $(this).parent('.row');
		var rowheight = $(row).height();
		$(this).css("height", rowheight);
	});
}

