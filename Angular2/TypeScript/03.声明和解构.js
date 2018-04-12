// tsc 03.声明和解构.ts
// ---------------数组解构------------------
// 常用
var input = [1, 2];
var first = input[0], second = input[1];
// 交换
_a = [second, first], first = _a[0], second = _a[1];
// 函数参数默认值（后面如果[number,number]）会提示找不到number这个变量
function fn(_a) {
    var _b = _a === void 0 ? [1, 2] : _a, a = _b[0], b = _b[1];
    console.log(first + second);
}
var _b = [1, 2, 3, 4], rest1 = _b[0], rest = _b.slice(1);
// ---------------对象------------------
var _c = { x: 100, y: 100, width: 1000, height: 2000 }, x = _c.x, y = _c.y, width = _c.width, height = _c.height;
var _a;
