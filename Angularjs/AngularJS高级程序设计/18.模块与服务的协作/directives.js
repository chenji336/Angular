//这里需要告诉directive是哪个模块的，我现在用的还是最初的模块
// 因此在调用的时候directive.js必须放到模块建立的后面，否则会提示没有建立模块
/*angular.module('exampleApp') 
.directive('triButton',function(){
	return {
		link:function(scope,element,attrs){
			element.on('click',function(event){
				console.log('Button click: '+event.target.innerText);
						scope.$apply(function(){
							scope.counter++;
						});
					});
		},
		scope:{counter:'=counter'}
	};
});*/

//我还可以建立一个指令的模块
// 这样加载的时候就可以写在任意位置，因为会依赖注入，在使用的时候，会去加载依赖项目
// 这样做的优势：可以引用在多个angular.module里面，如果上面这样做只能引用到一个地方
angular.module('customerDirective',[]) 
.directive('triButton',function(){
	return {
		link:function(scope,element,attrs){
			element.on('click',function(event){
				console.log('Button click: '+event.target.innerText);
						scope.$apply(function(){
							scope.counter1++;
						});
						// scope.$apply('counter1=counter1+1');
					});
		},
		scope:{counter1:'=counter'}
	};
});