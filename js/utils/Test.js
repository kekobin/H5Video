var Test = window.Test || {};
window.Test = Test;

+function(){
	Test.timeMap = {};
	Test.startTime = new Date().getTime();
}();

Test.printTime = function(tag, subTag/*可省略*/){
	var curTime = new Date().getTime();
	var lastTime = Test.startTime;
	if(tag in Test.timeMap){
		lastTime = Test.timeMap[tag];
	}
	Test.timeMap[tag] = curTime;
	var gapTime = curTime - lastTime;
	if(subTag == undefined){
		info('t', tag, gapTime);
	}else{
		info('t', tag, subTag, gapTime);
	}
}


