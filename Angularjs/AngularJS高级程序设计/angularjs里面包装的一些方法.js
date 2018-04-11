// angularjs里面包装的一些方法.js
// 这些方法跟jquery的差不多，只是前缀变了而已

//1.检测函数其实这个就类似typeof myFunction='function'
angular.isFunction(myFunction)

//2.扩展对象
//会把第二个对象中的属性赋值给第一个，**第一个对象的值不会赋值给第二个
angular.extend(myExtendedObject,myData)

//3.检查对象、string、undefined等
angular.isObject(myObject);
angular.isString(myString);
angular.isUndefined(myString);

//4.循环
//js和jquery的区别是，jquery后面在加data
angular.forEach(myData,function(value,key){});

//5.json
angular.toJson(data);//转成string json
angular.fromJson(jsonString);//转化成对象