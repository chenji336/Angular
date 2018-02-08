angular.module('customerFilters',[])
	.filter('unique',function(){
		return function(data,propertyName){
			var keys={};
			var results=[];
			if(angular.isArray(data)&&angular.isString(propertyName)){
				var val='';
				for(var i=0;i<data.length;i++){
					val=data[i][propertyName];
					if(angular.isUndefined(keys[val])){
						keys[val]=true;
						results.push(val);
					}
				}
				return results;
			}else{
				return data;
			}
		};
	})
	.filter('range',function($filter){
		return function(data,page,size){
			var start_index=(page-1)*size;
			if(angular.isArray(data)&&angular.isNumber(page)&&angular.isNumber(size)){
				return $filter('limitTo')(data.splice(start_index),size);
			}else{
				return data;
			}
		};
	})
	.filter('pageCount',function(){
	//按照作者的意思不应该用ng-repeat的filter进行次数的安排，最好是自己用指令来表示，这个会在后续章节进行讲解
	//（我滥用过滤器功能避免ng-repeat指令的制约。这是不好的，最好指令）
		return function(data,size){
			var results=[];
			if(angular.isArray(data)&&angular.isNumber(size)){
				for(var i=0;i<Math.ceil(data.length/size);i++){
					results.push(i+1)
				}
				return results;
			}else{
				return data;
			}
		}
	});