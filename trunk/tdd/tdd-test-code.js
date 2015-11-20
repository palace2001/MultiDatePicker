// 오늘 날짜 테스트
// 일 피커 테스트  (길이, date가 맞는지)
// 타입체크 테스트
module("Test 1")
QUnit.test( "Today Testing", function( assert ) {

	
    var result1 = set_CurrentDate();
	var result2 = set_CurrentMonth();
	var result3 = set_CurrentYear();
	var result4 = set_CurrentDay(); 
	
	equal(result1,20,"Testing Passed!");
	equal(result2,11,"Testing Passed!");
	equal(result3,2015,"Testing Passed!");
	equal(result4, 5,"Testing Passed!");	  
});













