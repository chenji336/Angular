angular.module('exampleApp',[])
.controller('defaultCtrl',function($scope,$http,$interval,$timeout,$log,$filter){
	$scope.counter=0;
	$scope.intervalCounter=0;
	$scope.timeoutCounter=0;

	$scope.incrementCounter=function(){
		$scope.counter++;
	}
	// $log.log('There are  items');
	// console.log($log.logs.length);
	$http.get('productData.json').success(function(data){
		$scope.products=data;
		$log.log('There are '+data.length+' items');

	});

	$interval(function(){
		$scope.intervalCounter++;
		// console.log($scope.intervalCounter);
	},5000,10);

	$timeout(function(){
		$scope.timeoutCounter++;
		// console.log($scope.timeoutCounter);
	},5000);

	console.log($filter('labelCase')('chenji',true));
})
.filter('labelCase',function(){
	return function(value,reverse){
		if(angular.isString(value)){
			var intermediate=reverse?value.toUpperCase():value.toLowerCase();
			return (reverse?intermediate[0].toLowerCase():intermediate[0].toUpperCase())+intermediate.substr(1);
		}else{
			return value;
		}
	}
})
.directive('unorderedList',function(){
	return function(scope,element,attrs){
		var data=scope[attrs['unorderedList']];
		if(angular.isArray(data)){
			var listElem=angular.element('<ul>');
			element.append(listElem);
			for(var i=0;i<data.length;i++){
				listElem.append(angular.element('<li>').text(data[i].name));
			}
		}
	}
})
.factory('counterService',function(){
	var counter=0;

	return {
		incrementCounter:function(){
			counter++;
		},
		getCounter:function(){
			return counter;
		}
	};
})
;