angular.module('sportsStore')//第二个参数不填会报错,但是我在app.html中定义了所以不报错
	   .constant('dataUrl','http://minxi.chenji:2403/products')//准备看一些跨域问题 minxi.chenji对应的就是域名，也是在hosts里面添加的
	   .constant('orderUrl','http://localhost:2403/orders')
	   .controller('sportsStoreCtrl',function($scope,$http,$location,dataUrl,orderUrl,productListActiveClass,cartFac){//这里也可以访问到别的文件下中sportsStore下的constant，只要依赖进来就行
			/*$scope.data={products:[{name:'Product #1',description:'A product',category:'Category #1',price:100},
						 {name:'Product #2',description:'A product',category:'Category #1',price:200},
						 {name:'Product #3',description:'A product',category:'Category #3',price:300},
						 {name:'Product #4',description:'A product',category:'Category #4',price:400},
			]};*/
			$scope.data={};
			$http.get(dataUrl)
				 .success(function(data){
				 	$scope.data.products=data;
				 })	
				 .error(function(error){
				 	$scope.data.error=true;//这里进来之后error是null，不知道是不是本地的原因，后面会有解释，到时候留意??
				 });

			$scope.sendOrder=function(shippingDetails){
				var order=angular.copy(shippingDetails);
				order.products=cartFac.getProducts();
				$http.post(orderUrl,order)//关于post，order最后一个参数是array，所以使用了products，倒数第二个是boolean所以传入true
					 .success(function(data){
					 	$scope.data.orderId=data.id;
					 	$scope.data.orderError=null;
					 	//??这个我其实不太明白真是的意图
					 	//这个是为了清空
					 	cartFac.getProducts().length=0;
					 })
					 .error(function(data, status, headers, config,pp,dd){
					 	//书上的参数写的是error，但是这个版本不是1.2.5,看了下代码应该是四个参数
					 	//其实书上的也没有错误，只是在某些情况下error不显示出来而已，所以还是要考虑进来，有status这个属性
					 	$scope.data.orderError={"status":status};
					 })
					 .finally(function(){
					 	$location.path('/complete');//location.hash也可以改变后面的#/complete
					 });
			};
		});