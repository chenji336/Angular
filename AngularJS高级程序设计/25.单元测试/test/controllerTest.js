describe('Controller Test',function(){
	var mockScope={};
	var controller;
	var backend;
	var mockInterval;
	var mockTimeout;
	var mockLog;

	// 基础的仿照
	beforeEach(angular.mock.module('exampleApp'));

	// 仿照http响应
	beforeEach(angular.mock.inject(function($httpBackend){
		backend=$httpBackend;
		backend.expect('GET','productData.json').respond(
			[
				{"action":"Buy Flowers","done":false},
				{"action":"Get Shoes","done":false},
				{"action":"Collect Tickets","done":true},
				{"action":"Call Joe","done":false}
			]
		);
	}));

	beforeEach(angular.mock.inject(function($controller,$rootScope,$http,$interval,$timeout,$log){
		mockScope=$rootScope.$new();
		mockInterval=$interval;
		mockTimeout=$timeout;
		mockLog=$log;
		controller=$controller('defaultCtrl',{
			$scope:mockScope,
			$http:$http,
			$interval:mockInterval,
			$timeout:mockTimeout,
			$log:mockLog
		});
		backend.flush();
	}));

	it('Creates variable',function(){
		expect(mockScope.counter).toEqual(0);
	});

	it('Increments counter',function(){
		mockScope.incrementCounter();
		expect(mockScope.counter).toEqual(1); 
	});

	it('Makes an Ajax request',function(){
		backend.verifyNoOutstandingExpectation();
	});
	
	it('Processes the data',function(){
		expect(mockScope.products).toBeDefined();
		expect(mockScope.products.length).toEqual(3);
	});

	it('Limits interval to 10 updates',function(){
		for(var i=0;i<11;i++){
			mockInterval.flush(5000);
		}
		expect(mockScope.intervalCounter).toEqual(10);
	});

	it('Increments timer counter',function(){
		mockTimeout.flush(5000);
		expect(mockScope.timeoutCounter).toEqual(1);
	});

	it('Writes log message',function(){
		expect(mockLog.log.logs.length).toEqual(1);
	});


});