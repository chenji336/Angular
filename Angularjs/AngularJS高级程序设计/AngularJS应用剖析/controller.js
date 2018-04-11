angular.module('exampleApp.controller',[])
	.run(function(nowDate){
		console.log('exampleApp.controller run time:',nowDate);
	})
	.config(function(){
		console.log('exampleApp.controller config time:','no time');
	})
	.controller('dayCtrl',function($scope,days){
		$scope.day=days.day;
	})
	.controller('tomorrowCtrl',function($scope,days){
		$scope.day=days.tomorrow;
	});