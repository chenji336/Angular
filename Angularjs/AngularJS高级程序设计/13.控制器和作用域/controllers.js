var app=angular.module('exampleApp',[]);
app.controller('topLevelCtrl',function($scope){
	// 如果用的是变量，那么firstChildCtrl和secondChildCtrl修改input中的值不会修改父类的
	// 因为这个相当于是值传递，对象传递的话则会修改
	$scope.dataValue='Hello,Adam';
	$scope.data={dataValue:'hello,Chen'};
	$scope.reverseText=function(){
		$scope.data.dataValue=$scope.data.dataValue.split('').reverse().join('');
	};
	$scope.changeCase=function(){
		var result=[];
		angular.forEach($scope.data.dataValue.split(''),function(char,index){
			result.push(index%2==1?char.toString().toUpperCase():char.toString().toLowerCase());
		});
		$scope.data.dataValue=result.join('');
	};
});

app.controller('firstChildCtrl',function($scope){
	$scope.changeCase=function(){
		$scope.data.dataValue=$scope.data.dataValue.toUpperCase();
	};
});

app.controller('secondChildCtrl',function($scope){
	$scope.changeCase=function(){
		$scope.data.dataValue=$scope.data.dataValue.toLowerCase();
	};
	$scope.shiftFour=function(){
		var result=[];
		angular.forEach($scope.data.dataValue.split(''),function(char,index){
			result.push(index<4?char.toUpperCase():char);
		});
		$scope.data.dataValue=result.join('');
	};
});