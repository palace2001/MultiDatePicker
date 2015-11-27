// 오늘 날짜 테스트
// 일 피커 테스트  (길이, date가 맞는지)
// 타입체크 테스트
module("Test 1")
QUnit.test( "Today Testing", function( assert ) {

	
    var resultDate = set_CurrentDate();
	var resultMonth = set_CurrentMonth();
	var resultYear = set_CurrentYear();
	var resultDay = set_CurrentDay(); 
	var resultToday = typeof(set_Today());
	
	equal(resultDate, 27,"Testing Passed!");
	equal(resultMonth, 11,"Testing Passed!");
	equal(resultYear, 2015,"Testing Passed!");
	equal(resultDay, 5,"Testing Passed!");
	equal(resultToday,'string',"Testing Passed!");	  
});

module("Test 2")
QUnit.test( "Day Of This Month Testing", function( assert ) {
	  var resultFirstDay = get_FirstDay();
	  var resultDayMax = get_day_max(2015,10);
	  var resultLastDay = get_LastDay();
	  
	  



	  equal(resultFirstDay, 0,"Testing Passed!");
	  equal(resultDayMax, 30,"Testing Passed!");
	  equal(resultLastDay, 1,"Testing Passed!");
	  
	


});


module("Test 3")
QUnit.test( "Length of Blank", function( assert ) {
	  var resultFirstBlank = get_FirstBlank();
	  var resultLastBlank = get_LastBlank();

	  equal(resultFirstBlank, 0,"Testing Passed!");
	  equal(resultLastBlank, 5,"Testing Passed!");

});













