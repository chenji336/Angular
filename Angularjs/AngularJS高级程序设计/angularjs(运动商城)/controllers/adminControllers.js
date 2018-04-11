angular.module('sportsStoreAdmin')
	.constant('authUrl','http://localhost:2403/users/login')
	.constant('ordersUrl','http://localhost:2403/orders')
	.controller('authCtrl',function($scope,$http,$location,authUrl){
		$scope.authenticate=function(user,pass){
			$http.post(authUrl,{
				username:user,
				password:pass
			},{
				withCredentials:true//这会启动跨域请求的支持，允许Ajax请求使用Cookie处理验证??不是很懂，以后再看
			}).success(function(data){
				$location.path('/main');
			}).error(function(error){
				if(error==null){
					$scope.authenticationError=true;
				}else{
					$scope.authenticationError=error;
				}
			});
		};
	})
	.controller('mainCtrl',function($scope){
		$scope.screens=['Products','Orders'];
		$scope.current=$scope.screens[0];

		$scope.setScreen=function(index){
			$scope.current=$scope.screens[index];
		};

		$scope.getScreen=function(){
			return $scope.current=='Products'?'views/adminProducts.html':'views/adminOrders.html';
		}
	})
	.controller('ordersCtrl',function($scope,$http,ordersUrl){
		//!!终于知道为啥要用withCredentials，如果不用的话在这个delays的工具产生的页面中就访问不了数据（如果你做了一些get或则put上的验证的话）
		// 这个是相当于把我的cookie传过去，里面带着我的密码和用户名
		$http.get(ordersUrl,{withCredentials:true})
			.success(function(data){
				$scope.orders=data;
			}).error(function(error){
				$scope.error=error==null?true:error;
			});

		$scope.selectedOrder;

		$scope.selectOrder=function(order){
			$scope.selectedOrder=order;
		};

		$scope.totalPrice=function(order){
			var total=0;
			for(var i=0;i<order.products.length;i++){
				total+=order.products[i].count*order.products[i].price;
			}
			return total;
		};
	});