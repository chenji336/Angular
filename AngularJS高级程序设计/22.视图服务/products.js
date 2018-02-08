angular.module('exampleApp',['increment','ngResource','ngRoute'])
.constant('baseUrl','http://localhost:2403/products/')
.config(function($routeProvider,$locationProvider){
 /*总结：1.设置控制器之后，那么在这个页面你就可以不用去添加了控制器了，否则还需要进行ng-controller的添加
		 但是有时候会添加最外层的域，所以也是需要进行ng-controller
	   2.路由也可以添加依赖
	   3.留个疑惑好了，在点击编辑之后，前端页面没有改变，但是数据库里面已经保存了*/

	// $locationProvider.html5Mode(true);
	$routeProvider.when('/edit/:id',{
		templateUrl:'editorView.html',
		controller:'editCtrl'

	});
	$routeProvider.when('/create',{
		templateUrl:'editorView.html',
		controller:'editCtrl'
	});
	$routeProvider.otherwise({
		templateUrl:'tableView.html',
		controller:'tableCtrl',
		// 进行路由的依赖
		resolve:{
			data:function(productsResource){
				return productsResource.query();
			}
		}
	});
})
.factory('productsResource',function($resource,baseUrl){
	// 进行路由的依赖
	return $resource(baseUrl+':id',{id:'@id'},{create:{method:'POST'},save:{method:'PUT'}});
	// 还可以配置$resource服务动作,所以还可以transformRequest等等请求
	// $scope.productsResouce=$resource(baseUrl+':id',{id:'@id'},{create:{method:'POST'},save:{method:'PUT'}});
})
.controller('defaultCtrl',function($scope,$http,$resource,$location,$routeParams,baseUrl){
	//父作用域
	$scope.data={};
	
	$scope.createProdct=function(product){
		new productsResource(product).$save().then(function(newProduct){
			$scope.data.products.push(newProduct);
			$location.path('/list');
		});
	};

	$scope.deleteProduct=function(product){
		// 提供$promise
		product.$delete().then(function(){
			$scope.data.products.splice($scope.data.products.indexOf(product),1);
		});
		$location.path('/list');
	};

})
.controller('tableCtrl',function($scope,$location,$route,data){
	$scope.data.products=data;

	$scope.refreshProducts=function(){
		$route.reload();
	};
})
.controller('editCtrl',function($scope,$routeParams,$location){
	$scope.currentProduct=null;

	$scope.$on('$routeChangeSuccess',function(){
		if($location.path().indexOf('/edit/')==0){
			var id=$routeParams['id'];
			for(var i=0;i<$scope.data.products.length;i++){
				if($scope.data.products[i].id==id){
					$scope.currentProduct=$scope.data.products[i];
					break;
				}
			}
		}
	});

	$scope.updateProduct=function(product){
		product.$save(); //这个是为了保存到数据库中
		$location.path('/list');
	};

	$scope.saveEdit=function(product){
		if(angular.isDefined(product.id)){
			$scope.updateProduct(product);
		}else{
			$scope.createProdct(product);
		}
		 $scope.currentProduct={}; 
	};

	$scope.cancelEdit=function(){
		/*$scope.currentProduct=null;
		$scope.displayMode='list';*/

		// 这个是为了清理任何未提交的本地改变
		// object p复制给了q ，如果p=null，其实q还是原来的值
		// p=null代表p指向了空的而已，存的值还是在地址中，只是p的指向变了而已
		/*if($scope.currentProduct && $scope.currentProduct.$get){
			$scope.currentProduct.$get();
		}
		$scope.currentProduct={};*/
		$location.path('/list');
	};
});