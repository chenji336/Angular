// 自定义过滤器
angular.module('exampleApp')
// 创建格式化数据值得过滤器
.filter('labelCase',function(){
	return function(value,reverse){
		if(angular.isString(value)){
			var labelValue=reverse?value.toUpperCase():value.toLowerCase();
			return (reverse?labelValue[0].toLowerCase():labelValue[0].toUpperCase())+labelValue.slice(1);
		}else{
			return value;
		}
	};
})
.filter('skip',function(){
	return function(data,count){
		// 第一个参数是集合，不是item，这个过滤器的参数如果是函数，那么函数的参数是item
		if(angular.isArray(data)&&angular.isNumber(count)){
			if(count>data.length||count<1){
				return data;
			}else{
				return data.slice(count);
			}
		}else{	
			return data;
		}
	};
})
.filter('take',function($filter){
	return function(data,skipCount,limitCount){
		var dataSkip=$filter('skip')(data,skipCount);
		return $filter('limitTo')(dataSkip,limitCount);
	};
})
;

