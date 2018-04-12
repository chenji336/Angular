// tsc 2.baseType.ts
// boolean类型
var flag = true;
// flag = 'false'; // 编译的时候会报错，不编译的时候也有红色波浪线提示
flag = false;
// number类型
var binaryLiteral = 10; // 二进制
var octalLiteral = 484; // 八进制
var decLiteral = 6; // 十进制
var hexLiteral = 0xf00d; // 十六进制
// string类型
var userName = '陈骥';
var years = 5;
console.log(userName + " love you " + years + " years");
// 数组类型
var arr = [1, 2, 3];
var arrGenericity = [1, 2, 3];
// 元组类型
var x = ['chenji', 28];
// 枚举类型
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
; // 默认是从0开始算起
var c = Color.Green;
console.log('c: Color', c); // 0
var ColorDefine;
(function (ColorDefine) {
    ColorDefine[ColorDefine["Red"] = 2] = "Red";
    ColorDefine[ColorDefine["Green"] = 3] = "Green";
    ColorDefine[ColorDefine["Blue"] = 6] = "Blue";
})(ColorDefine || (ColorDefine = {}));
; // 自己定义数字
var cDefine = ColorDefine.Green;
console.log('cDefine:', cDefine); // 3
// 任意类型 any（编译情况下不会报错）
// 使用的三种场景
// 1.变量的值会动态改变
var a = 100;
a = '趁机';
a = true;
// 2.运行时可能存在，编译时候不检查
a.ifItExists();
// 3.定义存储各种类型
var aUnknow = ['趁机', false, 100];
aUnknow[1] = false;
// undefined 和 null
// 启用--strictNullChecks
var und = 100;
und = undefined; // 错误
var und2 = 100;
und2 = null; // 正确
// void类型
// 表明函数返回没有值
function helloWorld() {
    console.log('i have no returnValue');
}
function func(foo) {
    var f = foo;
    //f.doSth(); // 报错，因为void代表没有返回值（如果设置any的话则不报错）
}
