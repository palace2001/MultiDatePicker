/* 
 *   Multidatepicker Testing 
 */


//   - Update Test Code -
module("Final Test")
QUnit.test( "Final Test", function( assert ) {


	// Today Setting for Testing ...
	  var resultSetday = set_Today();
	  var resultTypeofsetday = typeof(set_Today());
	  var resultFirstday = get_FirstDay();
	  var resultLastday = get_LastDay();
	  var resultDayMax1 = get_day_max(2015,12-1);  // ex) December
	  var resultDayMax2 = get_day_max(2016,2-1);  // ex) February

	  equal(resultSetday, '금',"Testing Passed!");
	  equal(resultTypeofsetday, 'string',"Testing Passed!");
	  equal(resultFirstday, 2,"Testing Passed!");
	  equal(resultLastday, 4,"Testing Passed!");
	  equal(resultDayMax1, 31,"Testing Passed!");
	  equal(resultDayMax2, 29,"Testing Passed!");

});





/*      -  Past Test Code  - 
module("Test 1")
QUnit.test( "Today Testing", function( assert ) {

	
    var resultDate = set_CurrentDate();
	var resultMonth = set_CurrentMonth();
	var resultYear = set_CurrentYear();
	var resultDay = set_CurrentDay(); 
	var resultToday = typeof(set_Today());
	
	equal(resultDate, 24,"Testing Passed!");
	equal(resultMonth, 12,"Testing Passed!");
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

 */  // End















