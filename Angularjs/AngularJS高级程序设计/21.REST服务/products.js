angular.module('exampleApp',['increment','ngResource'])
.constant('baseUrl','http://localhost:2403/products/')
.controller('defaultCtrl',function($scope,$http,$resource,baseUrl){
	$scope.displayMode='list';
	$scope.currentProduct=null;

	$scope.productsResouce=$resource(baseUrl+':id',{id:'@id'});
	// 还可以配置$resource服务动作,所以还可以transformRequest等等请求
	// $scope.productsResouce=$resource(baseUrl+':id',{id:'@id'},{create:{method:'POST'},save:{method:'PUT'}});

	// 在增删改查的基础上，在建立一些函数进行扩展而已 

	$scope.listProducts=function(){
		/*$scope.products=[
			{id:0,name:'Dummy1',category:'Test',price:1.24},
			{id:0,name:'Dummy2',category:'Test',price:2.24},
			{id:0,name:'Dummy3',category:'Test',price:3.24}
		];*/

		/*$http.get(baseUrl).success(function(data){
			$scope.products=data;
		});*/

		$scope.products=$scope.productsResouce.query();
	};

	$scope.deleteProduct=function(product){
		/*$scope.products.splice($scope.products.indexOf(product),1);*/

		// 如果在RESTFUL定义了一些权限方面的东西的话，没有带权限信息过去的话会不通过的
		/*if(me===undefined||me.username!="admin"){
    		cancel("No authorization",401);
		 }*/
		/*$http({
			method:'DELETE',
			url:baseUrl+product.id
		}).success(function(){
			$scope.products.splice($scope.products.indexOf(product),1);
		});*/
		
		// 提供$promise
		product.$delete().then(function(){
			$scope.products.splice($scope.products.indexOf(product),1);
		});
		// $scope.displayMode='list';
	};

	$scope.createProdct=function(product){
		/*$scope.products.push(product);
		$scope.displayMode='list';*/

		/*$http.post(baseUrl,product).success(function(newProduct){
			$scope.products.push(newProduct);
			$scope.displayMode='list';
		});*/

		new $scope.productsResouce(product).$save().then(function(newProduct){
			$scope.products.push(newProduct);
			$scope.displayMode='list';
		});

		// 如果上面进行了$resource配置的话
	/*	new $scope.productsResouce(product).$create().then(function(newProduct){
			$scope.products.push(newProduct);
			$scope.displayMode='list';
		});*/

	};

	$scope.updateProduct=function(product){
		/*for(var i=0;i<$scope.products.length;i++){
			if($scope.products[i].id==product.id){
				$scope.products[i]=product;
				break;
			}
		}
		$scope.displayMode='list';*/

		/*$http({
			url:baseUrl+product.id,
			data:product,
			method:'PUT'
		}).success(function(newProduct){
			for(var i=0;i<$scope.products.length;i++){
				if($scope.products[i].id==newProduct.id){
					$scope.products[i]=newProduct;
					break;
				}
			}
			$scope.displayMode='list';
		});*/

		product.$save(); //这个是为了保存到数据库中
		$scope.displayMode='list';
	};

	$scope.editOrCreateProduct=function(product){
		/*$scope.currentProduct=product ? angular.copy(product) : {};
		$scope.displayMode='edit';*/

		$scope.currentProduct=product ? product : {};
		$scope.displayMode='edit';
	};

	$scope.saveEdit=function(product){
		if(angular.isDefined(product.id)){
			$scope.updateProduct(product);
		}else{
			$scope.createProdct(product);
		}
	};

	$scope.cancelEdit=function(){
		/*$scope.currentProduct=null;
		$scope.displayMode='list';*/

		// 这个是为了清理任何未提交的本地改变
		// object p复制给了q ，如果p=null，其实q还是原来的值
		// p=null代表p指向了空的而已，存的值还是在地址中，只是p的指向变了而已
		if($scope.currentProduct && $scope.currentProduct.$get){
			$scope.currentProduct.$get();
		}
		$scope.currentProduct={};
		$scope.displayMode='list';
	};

	$scope.listProducts();
});