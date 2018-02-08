angular.module('cart',[])//共享，从一个对象被用于整个应用程序开始，工厂函数将只被调用一次??
	.factory('cartFac',function(){//之前还是忘了给factory加名字!!
		var cartData=[];

		return {
			addProduct:function(id,name,price){
				var addedToExisting=false;
				for(var i=0;i<cartData.length;i++){
					if(cartData[i].id===id){
						cartData[i].count++;
						addedToExisting=true;
						break;
					}
				}
				if(!addedToExisting){
					cartData.push({
						count:1,//!!我开始把count写成0了，导致需要点击两次之后才可以进行添加
						id:id,
						name:name,
						price:price
					});
				}
			},
			removeProduct:function(id){
				for(var i = 0;i<cartData.length;i++){
					if(cartData[i].id===id){
						cartData.splice(i,1);
						break;
					}
				}
			},
			getProducts:function(){//这里不是展示而是获取
				return cartData;
			}
		};
	})
	.directive("cartSummary",function(cartFac){
		return {//!!我这里在添加指令的时候忘了加return了
			restrict:'E',
			templateUrl:'components/cart/cartSummary.html',//关于这个路径：最外面有引用cart.js，所以以app.html的目录为路径
			controller:function($scope){//这个$scope作用域是上面的html
				var cartData=cartFac.getProducts();

				$scope.total=function(){
					var total=0;
					for(var i=0;i<cartData.length;i++){
						total+=cartData[i].price*cartData[i].count;
					}
					return total;
				};

				$scope.itemCount=function(){
					var total=0;
					for(var i=0;i<cartData.length;i++){
						total+=cartData[i].count;
					}
					return total;
				};
			}
		};
	});