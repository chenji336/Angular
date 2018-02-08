angular.module('increment',[])
.directive('create',function(){
	return {
		scope:{
			/*value1:'=value'*/
			item: '=item',
			property: '@propertyName',
			restful: '@restful',
			method: '@methodName'
		},
		link:function(scope,element,attrs){
			var button=angular.element('<button>');
			button.text('+');
			button.addClass('btn btn-primary btn-xs');
			element.append(button);
			button.on('click',function(){
				    /*console.log(scope);
					scope.value1++;*/
					scope.$apply(function(){
						/*scope.value1++;*/

						// 这些item都是经过$resource转化来的，所以可以使用这些隐藏的ajax的方法
						scope.item[scope.property]++;
						if(scope.restful){
							scope.item[scope.method]();
						}
					});
				
			});
		},
		restrict:'E'
	};
});