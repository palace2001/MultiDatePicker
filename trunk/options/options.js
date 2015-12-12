$(document).ready(function(){
	/**
	 *	시작 모드를 선택합니다.
	 */
	ymdSelectMode();	//년-월-일을 선택하는 모드로 시작합니다.
	//ymSelectMode();	//년-월을 선택하는 모드로 시작합니다.
	//ySelectMode();	//년을 선택하는 모드로 시작합니다.

	//leftMenuHide();	//왼쪽 상단 [년] 또는 [년-월] 또는 [년-월-일]로 모드를 전환하는 버튼 영역을 숨기고 싶다면 주석을 해제하세요.

	clearButtonHide();	//선택초기화 버튼을 숨기고 싶다면 주석을 해제하세요.
});

var convertDateToText = ["일", "월", "화", "수", "목", "금", "토"];