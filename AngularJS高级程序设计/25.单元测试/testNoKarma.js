angular.mock.inject(function($controller,$rootScope,$http,$interval,$timeout,$log){
		mockScope=$rootScope.$new();
		mockInterval=$interval;
		mockTimeout=$timeout;
		mockLog=$log;
		console.log(mocklog.log.logs.length);
	});