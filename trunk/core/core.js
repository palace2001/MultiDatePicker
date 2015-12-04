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
	ymdSelectMode();
});

function binding(){
	$("#prev").bind("click", function(){
		prevButton();
	});
	$("#next").bind("click", function(){
		nextButton();
	});
	$("#today").bind("click", function(){
		todayButton();
	});
	$("#y-select").bind("click", function(){
		ySelectMode();
	});
	$("#ym-select").bind("click", function(){
		ymSelectMode();
	});
	$("#ymd-select").bind("click", function(){
		ymdSelectMode();
	});
}

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
	ymdDraw();
}

function todayButton(){
	year = today.getFullYear();
	month = today.getMonth() + 1;
	day = today.getDate();
	ymdDraw();
}

function nextButton(){
	if(month != 12)
	{
		month ++;
	}else{
		year ++;
		month = 1;
	}
	ymdDraw();
}

function ySelectMode(){

}

function ymSelectMode(){
	headerDraw("ym");
	ymDraw();
	yearDraw();
	binding();
}

function ymdSelectMode(){
	headerDraw("ymd");
	ymdDraw();
	binding();
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

function bindingDateClickEvent(){
	$(".date").bind("click", function(e){	
		pushSelectedDate($(this).attr("dateValue"));
	});
}

//drawing functions area

function headerDraw(mode){
	switch(mode){
		case 'y':
		var str = '';
		break;
		case 'ym':
		var str = '<div id="header"><span id="left"><span id="modeSelectButtonGroup"><button id="y-select">년</button><button id="ym-select">년-월</button><button id="ymd-select">년-월-일</button></span></span><span id="center"><ul id="yearSelect"></ul></span><span id="right"><span id="moveButtonGroup"><button id="prev">이전</button><button id="today">오늘</button><button id="next">다음</button></span></span>';
		break;
		case 'ymd':
		var str = '<div id="header"><span id="left"><span id="modeSelectButtonGroup"><button id="y-select">년</button><button id="ym-select">년-월</button><button id="ymd-select">년-월-일</button></span></span><span id="center"><h1 id="calendarTitle"><span id="year"></span>년 <span id="month"></span>월</h1></span><span id="right"><span id="moveButtonGroup"><button id="prev">이전</button><button id="today">오늘</button><button id="next">다음</button></span></span></div>';
		break;
	}
	str += '<div id="content"></div>';
	$(".multiDatePicker").empty().append(str);
}

function ymdDraw() {
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
	bindingDateClickEvent();
}

function ymDraw(){
	var str = '<ul id="monthSelect">';
	for (var i = 1; i < 13; i++) {
		str += '<li dateValue="' + i + '">' + i + '</li>';
	};
	$("#content").append(str);
}

function yearDraw(){

	var str = '';
	for (var i = 0; i < 7; i++) {
		str += '<li>' + (year + i - 3) + '</li>';
	}
	$("#yearSelect").empty().append(str);
}

function setRowHeight(){
	$(".date").each(function(){
		var row = $(this).parent('.row');
		var rowheight = $(row).height();
		$(this).css("height", rowheight);
	});
}