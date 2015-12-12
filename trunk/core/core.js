var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();

var clickedYear = today.getFullYear();;
var selectedDate = [];
var selectedMonth = [];
var selectedYear = [];

var mode = '';
var footershow = true;
var leftshow = true;

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

/**
 * Function : prevButton
 *   - 이전 버튼에 binding된 함수
 *	 - 년월일 모드에서는 달을 감소시키고, 그 외의 모드에서는 년을 감소시킴.
 */
 function prevButton(){
 	switch(mode){
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
 		case 'ym':
 		year = year - 7;
 		clickedYear = null;
 		yearDraw();
 		ymDraw();
 		break;
 		default:
 		year = year - 7;
 		yearDraw();
 		break;
 	}
 	accessSelectedDateForAddClassSelected();
 }

/**
 * Function : todayButton
 *   - 다른날에서 오늘로 돌아감
 */
 function todayButton(){
 	year = today.getFullYear();
 	month = today.getMonth() + 1;
 	day = today.getDate();
 	switch(mode){
 		case 'ymd':
 		ymdDraw();
 		break;
 		case 'ym':
 		yearDraw();
 		ymDraw();
 		break;
 		default:
 		yearDraw();
 		break;
 	}
 	accessSelectedDateForAddClassSelected();
 }

/**
 * Function : nextButton
 *   - 다음 버튼에 binding된 함수
 *	 - 년월일 모드에서는 달을 증가시키고, 그 외의 모드에서는 년을 증가시킴.
 */
 function nextButton(){
 	switch(mode){
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
 		case 'ym':
 		year = year + 7;
 		clickedYear = null;
 		yearDraw();
 		ymDraw();
 		break;
 		case 'y':
 		year = year + 7;
 		yearDraw();
 		break;
 	}
 	accessSelectedDateForAddClassSelected();
 }

 function accessSelectedDateForAddClassSelected()
 {
 	$(".date").each(function(){
 		switch(mode){
 			case 'ym':
 			for (var i = 0; i < selectedDate.length; i++) {
 				var dateForCheckYear = selectedDate[i].split("-");
 				if($(this).attr("datevalue") == dateForCheckYear[0]){
 					$(this).addClass("selected");
 				}
 			}

 			default:
 			for (var i = 0; i < selectedDate.length; i++) {
 				if($(this).attr("datevalue") == selectedDate[i]){
 					$(this).addClass("selected");
 				}
 			}
 			break;
 		}
 	});
}

/**
 * Function : ySelectMode
 *   - [년] 버튼에 binding되어있는 함수.
 */
 function ySelectMode(){
 	if(mode == 'y'){
 		return false;
 	}
 	mode = 'y';
 	headerDraw("y");
 	yearDraw();
 	bindingClickEventForHeaderButton();
 	accessSelectedDateForAddClassSelected();
 	if (!leftshow) {leftMenuHide()};
 	if (!footershow) {clearButtonHide()};
 }

/**
 * Function : ymSelectMode
 *   - [년-월] 버튼에 binding되어있는 함수.
 */
 function ymSelectMode(){
 	if(mode == 'ym'){
 		return false;
 	}
 	mode = 'ym';
 	headerDraw("ym");
 	ymDraw();
 	yearDraw();
 	bindingClickEventForHeaderButton();
 	accessSelectedDateForAddClassSelected();
 	if (!leftshow) {leftMenuHide()};
 	if (!footershow) {clearButtonHide()};
 }

/**
 * Function : ymdSelectMode
 *   - [년-월-일] 버튼에 binding되어있는 함수.
 */
 function ymdSelectMode(){
 	if(mode == 'ymd'){
 		return false;
 	}
 	mode = 'ymd';
 	headerDraw("ymd");
 	ymdDraw();
 	bindingClickEventForHeaderButton();
 	accessSelectedDateForAddClassSelected();
 	if (!leftshow) {leftMenuHide()};
 	if (!footershow) {clearButtonHide()};
 }

 /**
  *	Function : addClassForSelected
  *		- 날짜 선택 시, datevalue 속성이 해당 날짜 값인 요소를 찾아 selected 클래스를 부여.
  *		- css(scss)에서 선택 시 시각적 효과를 제어할 수 있음.
  */
  function addClassForSelected(pickeddate)
  {
  	$("li[datevalue='"+pickeddate+"']").addClass("selected");
  }

/**
  *	Function : deletePickedDate
  *		- 날짜 선택 시, datevalue 속성이 해당 날짜 값인 요소를 찾아 selected 클래스를 제거하고,
  *			selectedDate에서 해당 날짜 값을 찾아 배열에서 제거.
  */
  function deletePickedDate(pickeddate)
  {
  	$("li[datevalue='"+pickeddate+"']").removeClass("selected");

  	for (var i = 0; i < selectedDate.length; i++) {
  		if(selectedDate[i] == pickeddate){
  			selectedDate.splice(i,1);
  			i--;
  		}
  	}
  	console.log(selectedDate);
  }

/**
 * Function : pushSelectedDate
 *	 - ymdMode에서 날짜를 선택하는 함수
 *   - 중복된 날짜인지 검사하여 중복된 날짜라면 selectedDate에서 해당 날짜를 제거하고 deletePickedDate 함수로 이행
 *	 - 중복된 날짜가 아니라면 selectedDate에 해당 날짜를 push하고 addClassForSelected 함수로 이행
 */
 function pushSelectedDate(pickeddate){
 	if(checkDuplicationData(pickeddate)){
 		deletePickedDate(pickeddate);
 	}else{
 		selectedDate.push(pickeddate);
 		addClassForSelected(pickeddate);
 		console.log(selectedDate);
 	}
 }

/**
 * Function : pushSelectedMonth
 *   - ymMode에서 날짜를 선택하는 함수
 */
 function pushSelectedMonth(pickedMonth){
 	if (checkDuplicationData(pickedMonth)) {
 		deletePickedDate(pickedMonth);
 		var non = true;
 		for (var i = 0; i < selectedDate.length; i++) {
 			var dateForCheckYear = selectedDate[i].split("-");
 			if(dateForCheckYear[0] == clickedYear){
 				non = false;
 			}
 		}
 		if (non) {$(".selected[datevalue='" + clickedYear + "']").removeClass("selected");}
 	}else{
 		addClassForSelected(pickedMonth);
 		selectedDate.push(pickedMonth);
 		console.log(selectedDate);
 	}
 }

/**
 * Function : pushSelectedYear
 *   - yMode에서 날짜를 선택하는 함수
 */
 function pushSelectedYear(pickedYear){
 	if (checkDuplicationData(pickedYear)) {
 		deletePickedDate(pickedYear);
 	}else{
 		$("li[datevalue='"+clickedYear+"']").removeClass("selected");
 		selectedDate.push(pickedYear);
 		addClassForSelected(pickedYear);
 		console.log(selectedDate);
 	}
 }

/**
 * Function : checkDuplicationData
 *   - 중복된 날짜가 있는지 체크하고 여부를 반환
 */
 function checkDuplicationData(pickeddate){
 	for (var i = 0; i < selectedDate.length; i++) {
 		if(selectedDate[i] == pickeddate){
 			return true;
 		}
 	}
 	return false;
 }

/**
 * Function : bindingDateClickEvent
 *   - date클래스가 부여된 요소 중 datevalue가 undefiend인 요소인지 검사 후 selectedDate에 값을 넣는 절차를 binding하는 함수 
 */
 function bindingDateClickEvent(){
 	$(".date").bind("click", function(e){
 		if($(this).attr("dateValue") !== undefined){
 			pushSelectedDate($(this).attr("datevalue"));
 		}
 	});
 }

/**
 * Function : bindingMonthClickEvent
 *   - 미리 선택된 년도와 선택한 월을 0000-00의 형식으로 가공하여 selectedDate에 넣는 함수
 */
 function bindingMonthClickEvent(){
 	$("#monthSelect li").bind("click", function(e){
 		if(clickedYear == null){
 			alert("연도를 선택해 주세요!");
 		}else{
 			pushSelectedMonth($(this).attr("datevalue"));
 		}
 	});
 }

/**
 * Function : bindingYearClickEvent
 *   - 각 모드에 따라 년도 버튼이 작동하는 방식을 정의한 함수
 */
 function bindingYearClickEvent(){
 	$("#yearSelect li").bind("click", function(e){
 		clickedYear = $(this).attr("datevalue");
 		addClassForSelected(clickedYear);
 		ymDraw();
 		accessSelectedDateForAddClassSelected();
 		console.log(clickedYear);
 		if(mode == 'y'){
 			pushSelectedYear(clickedYear);
 		}
 	});
 }

//drawing functions area

/**
 * Function : headerDraw
 *   - 각 모드에 맞는 초기템플릿을 그림.
 */
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
 	str += '<div id="footer"><button onclick="clearDate();">선택초기화</button></div>';
 	$(".multiDatePicker").empty().append(str);
 }

/**
 * Function : ymdDraw
 *   - ymd모드의 템플릿을 그림
 */
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
 		str += '<li class="date" datevalue="' + year + '-' + month + '-' + dateNum + '">' + dateNum + '</li>';
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

/**
 * Function : ymDraw
 *   - ym모드의 템플릿을 그림
 */
 function ymDraw(){
 	var str = '<ul id="monthSelect">';
 	for (var i = 1; i < 13; i++) {
 		str += '<li class="date" datevalue="' + clickedYear + "-" + i + '">' + i + '</li>';
 	};
 	$("#content").empty().append(str);
 	bindingMonthClickEvent();
 }

/**
 * Function : yearDraw
 *   - y모드의 템플릿을 그림
 */
 function yearDraw(){
 	var str = '';
 	for (var i = 0; i < 7; i++) {
 		str += '<li class="date" datevalue="' + (year + i - 3) + '">' + (year + i - 3) + '</li>';
 	}
 	$("#yearSelect").empty().append(str);
 	bindingYearClickEvent();
 }

/**
 * Function : setRowHeight
 *   - 날짜 선택 부분을 정사각형 모양으로 가공
 */
 function setRowHeight(){
 	var width = $(".date").css("width");
 	$(".date").css("height", width);
 }

/**
 * Function : leftMenuHide
 *   - 모드 선택 부분을 가리는 함수
 */
 function leftMenuHide()
 {
 	$("#left").empty();
 	leftshow = false;
 }
/**
 * Function : leftMenuHide
 *   - 선택 초기화 부분을 가리는 함수
 */
 function clearButtonHide()
 {
 	$("#footer").empty();
 	footershow = false;
 }

 /**
 * Function : clearDate
 *   - 선택 초기화 버튼 기능
 */
 function clearDate(){
 	selectedDate = [];
 	$(".selected").removeClass("selected");
 	console.log(selectedDate);
 }


 