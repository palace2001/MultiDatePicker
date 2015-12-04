var convertDateToText = ["일", "월", "화", "수", "목", "금", "토"];
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();

var clickedYear = null;
var selectedDate = [];
var selectedMonth = [];
var selectedYear = [];

var mode = '';

$(document).ready(function(){
	ymdSelectMode();
});

function bindingClickEventForHeaderButton(){
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

/**
 * Function : set_Today
 *   - 오늘의 요일를 구함
 */
function set_Today() {
	var index = today.getDay();
	return convertDateToText[index];
}

/**
 * Function : get_FirstDay
 *   - 해당하는 달 1일의 요일을 구함
 *   - ex) 만약 월요일이라면 월요일(1)을 반환함
 */
function get_FirstDay(){
	var d = new Date(year,month-1,1);
	return d.getDay();
}

/**
 * Function : get_LastDay
 *   - get_day_max 함수를 이용하여 마지막 일의 요일을 구함
 */
function get_LastDay(){
	var d = new Date(year,month-1,get_day_max(year,month-1));
	return d.getDay();
}

/**
 * Function : get_day_max
 *   - parameter로 받아오는 년(year),월(month)의 마지막 일을 구함
 */
function get_day_max(year,month){
	var i = 29, cday;
	while(i < 32){
		cday = new Date(year,month,i);
		if (cday.getFullYear()!=year || cday.getMonth()!=month) break;
		i++;
	}
	return i-1;
}

/**
 * Function : draw_prevBlank
 *   - for문을 이용하여 1일 시작 전까지의 공백을 그림
 *   - ex) 만약 1일이 수요일이라면 일요일, 월요일, 화요일 공백 칸을 생성
 */
function draw_prevBlank(){
	var str = '<ul class="row">';
	for (var i = 0; i < get_FirstDay(); i++) {
		str += '<li class="date"> . </li>';
	}
	return str;
}

/**
 * Function : get_LastBlank
 *   - 마지막 날부터 해당 주의 토요일까지 공백 칸의 수를 계산
 *   - ex) 만약 마지막 날이 목요일이라면 금요일, 토요일 칸을 생성해야함 => 해당 월 마지막 공백 칸의 수를 리턴
 *   - (+) 마지막날이 토요일이면 추가로 생성할 필요가 없으므로 실행하지 않음
 */
function get_LastBlank(){
	if(get_LastDay()!=0){
		return 6-get_LastDay();
	}
	return 6;
}

/**
 * Function : draw_LastBlank
 *   - 해당하는 월의 마지막 공백을 그림
 */
function draw_LastBlank(){
	var str = '';
	for (var i = 0; i < get_LastBlank(); i++) {
		str += '<li class="date"> . </li>';
	}
	str += '</ul>';
	return str;
}

function prevButton(){
	switch(mode){
		case 'y':

		break;
		case 'ym':
		year = year - 7;
		yearDraw();
		break;
		case 'ymd':
		if(month != 1)
		{
			month --;
		}else{
			year --;
			month = 12;
		}
		ymdDraw();
		break;
	}
}

function todayButton(){
	year = today.getFullYear();
	month = today.getMonth() + 1;
	day = today.getDate();
	switch(mode){
		case 'y':

		break;
		case 'ym':
		yearDraw();
		break;
		case 'ymd':
		ymdDraw();
		break;
	}
}

function nextButton(){
	switch(mode){
		case 'y':

		break;
		case 'ym':
		year = year + 7;
		yearDraw();
		break;
		case 'ymd':
		if(month != 12)
		{
			month ++;
		}else{
			year ++;
			month = 1;
		}
		ymdDraw();
		break;
	}
}

function ySelectMode(){
	mode = 'y';
	headerDraw("y");
	yearDraw();
	bindingClickEventForHeaderButton();
}

function ymSelectMode(){
	mode = 'ym';
	headerDraw("ym");
	ymDraw();
	yearDraw();
	bindingClickEventForHeaderButton();
}

function ymdSelectMode(){
	mode = 'ymd';
	headerDraw("ymd");
	ymdDraw();
	bindingClickEventForHeaderButton();
}

function pushSelectedDate(pickeddate){
	if(checkDuplicationData(pickeddate)){
		alert("중복된 날짜를 선택하셨습니다.");
	}else{
		selectedDate.push(pickeddate);
		console.log(selectedDate);
	}
}

function pushSelectedMonth(pickedMonth){
	if (checkDuplicationData(pickedMonth)) {
		alert("중복된 날짜를 선택하셨습니다.");
	}else{
		selectedDate.push(pickedMonth);
		console.log(selectedDate);
	}
}

function pushSelectedYear(pickedYear){
	if (checkDuplicationData(pickedYear)) {
		alert("중복된 날짜를 선택하셨습니다.");
	}else{
		selectedDate.push(pickedYear);
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

function bindingMonthClickEvent(){
	$("#monthSelect li").bind("click", function(e){
		if(clickedYear == null){
			alert("연도를 선택해 주세요!");
		}else{
			pushSelectedMonth(clickedYear + '-' + $(this).attr("dateValue"));
		}
	});
}

function bindingYearClickEvent(){
	$("#yearSelect li").bind("click", function(e){
		clickedYear = $(this).attr("dateValue");
		console.log(clickedYear);
		if(mode == 'y'){
			pushSelectedYear(clickedYear);
		}
	});
}

//drawing functions area

function headerDraw(mode){
	switch(mode){
		case 'ymd':
		var str = '<div id="header"><span id="left"><span id="modeSelectButtonGroup"><button id="y-select">년</button><button id="ym-select">년-월</button><button id="ymd-select">년-월-일</button></span></span><span id="center"><h1 id="calendarTitle"><span id="year"></span>년 <span id="month"></span>월</h1></span><span id="right"><span id="moveButtonGroup"><button id="prev">이전</button><button id="today">오늘</button><button id="next">다음</button></span></span></div>';
		break;
		default:
		var str = '<div id="header"><span id="left"><span id="modeSelectButtonGroup"><button id="y-select">년</button><button id="ym-select">년-월</button><button id="ymd-select">년-월-일</button></span></span><span id="center"><ul id="yearSelect"></ul></span><span id="right"><span id="moveButtonGroup"><button id="prev">이전</button><button id="today">오늘</button><button id="next">다음</button></span></span>';
		break;
	}
	str += '<div id="content"></div>';
	$(".multiDatePicker").empty().append(str);
}

function ymdDraw() {
	var str = '<ul class="row">';
	for (var i = 0; i < 7; i++) {
		str += '<li class="weekText">' + convertDateToText[i] + '</li>';
	}
	str += '</ul>';

	var firstDay = get_FirstDay() + 1;

	str += draw_prevBlank();

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
	bindingMonthClickEvent();
}

function yearDraw(){
	var str = '';
	for (var i = 0; i < 7; i++) {
		str += '<li dateValue="' + (year + i - 3) + '">' + (year + i - 3) + '</li>';
	}
	$("#yearSelect").empty().append(str);
	bindingYearClickEvent();
}

function setRowHeight(){
	$(".date").each(function(){
		var row = $(this).parent('.row');
		var rowheight = $(row).height();
		$(this).css("height", rowheight);
	});
}