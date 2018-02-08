angular.module('sportsStore')
	.constant('productListActiveClass','btn-primary')
	.constant('productListPageSize',3)
	// $filter我不清楚做什么用
	// 如果不在controller的function中添加constant中的名字就不能用****
	.controller('productListCtrl',function($scope,$filter,productListActiveClass,productListPageSize,cartFac){
		var selectedCategory;
		$scope.pageSize=productListPageSize;
		$scope.selectedPage=1;

		$scope.selectCategory=function(newCategory){
			selectedCategory=newCategory;
			$scope.selectedPage=1;
		};

		$scope.categoryFilterFn=function(product){
			return selectedCategory==null||
				product.category==selectedCategory;
		};

		$scope.getCategoryClass=function(newCategory){
			return selectedCategory==newCategory?productListActiveClass:'';
		};

		$scope.selectPage=function(pageCount){
			$scope.selectedPage=pageCount;
		};

		$scope.getPageClass=function(pageCount){
			return $scope.selectedPage==pageCount?productListActiveClass:"";
		};

		$scope.addProductToCart=function(product){
			cartFac.addProduct(product.id,product.name,product.price);
		};
	});