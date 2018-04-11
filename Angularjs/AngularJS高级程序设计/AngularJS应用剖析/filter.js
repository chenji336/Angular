angular.module('exampleApp.filter',[])
	.filter('dayName',function(){
				var dayNames=['Sunday','Monday','TuesDay','Wednesday','Thursday','Friday','Saturday'];
				return function(input){
					return angular.isNumber(input)?dayNames[input]:input;
				}
			});