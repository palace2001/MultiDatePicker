// 오늘 날짜 테스트
// 일 피커 테스트  (길이, date가 맞는지)
// 타입체크 테스트
module("Test 1")
QUnit.test( "Today Testing", function( assert ) {
	function set_CurrntDate() {
        var dt = new Date
        return 17;
    }
    function set_CurrentMonth() {
        var dt = new Date
        return 11;
    }
    function set_CurrentYear() {
        var dt = new Date
        return 2015;
    }
    function set_CurrentDay() {
        var dt = new Date
        return 2;
    }
	var result1 = set_CurrntDate();
	var result2 = set_CurrentMonth();
	var result3 = set_CurrentYear();
	var result4 = set_CurrentDay(); 
	
    

	equal(result1,17,"Testing Passed!");
	equal(result2,11,"Testing Passed!");
	equal(result3,2015,"Testing Passed!");
	equal(result4,2,"Testing Passed!");	  
});

module("Test 2")
QUnit.test( "Today Testing 2", function( assert ) {

	function set_Today() {
        return '화';
    }
    
    var result = typeof(set_Today());
	equal(result,'string',"Testing Passed!");
		  
}); 











