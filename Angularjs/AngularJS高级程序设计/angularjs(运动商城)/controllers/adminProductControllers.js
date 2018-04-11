//关于为啥要单独建立一个controllser.js而不是放在adminControllers.js中我的理解是
//因为product有关于删除和编辑的操作，而且比较独立，所以放在这里，我只是猜测而已
angular.module('sportsStoreAdmin')
	.constant('productsUrl','http://localhost:2403/products/')//最后这个斜杠不要忘记了，因为delete的时候会接上id，没有斜杠就娶不到这个url
	.config(function($httpProvider){
		$httpProvider.defaults.withCredentials=true;
	})
	.controller('productsCtrl',function($scope,$http,$resource,productsUrl){
		$scope.productResource=$resource(productsUrl+':id',{id:'@id'});

		//关于resource：如果取数我用$http.get不行吗？
		//是可以的，不过我觉得你使用了get的话则下面的话product就不能使用$delete、$save这些方法了
		$scope.listProducts=function(){
			$scope.products=$scope.productResource.query();
		};

		$scope.deleteProduct=function(product){
			product.$delete().then(function(){
				$scope.products.splice($scope.products.indexOf(product),1);//!!兄弟啊，indexOf不是indexof，切记
			});
		};

		//因为这个product不是从resource中取出来的，所以需要使用resource来new
		$scope.createProduct=function(product){
			//！！如果创建的时候我输入的东西有错误，比如int输入了string，那么浏览器会包400 bad request错误哦
			new $scope.productResource(product).$save().then(function(newProduct){
				$scope.products.push(newProduct);
				$scope.editProduct=null;
			});
		};

		$scope.updateProduct=function(product){
			product.$save();
			$scope.editProduct=null;
		};

		$scope.startEdit=function(product){
			$scope.editProduct=product;
		};

		$scope.cancelEdit=function(){
			$scope.editProduct=null;
		};

		$scope.listProducts();
	})