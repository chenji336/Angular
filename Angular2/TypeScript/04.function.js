// tsc 04.function.ts
// 函数声明写法
function maxA(x, y) {
    return x > y ? x : y;
}
maxA(1, 3);
// 函数表达式写法
var maxB = function (x, y) {
    return x > y ? x : y;
};
maxB(1, 2);
// 可选参数 y?:(?理解成正则表达式的0-1) 必须在必须参数后面
function maxOption(x, y) {
    if (y) {
        return x > y ? x : y;
    }
    return x;
}
maxOption(1);
// 默认参数（传入undefined的时候也取的默认参数;如果在默认参数在前面，要显示的传入undefined）
function maxDefault(x, y) {
    if (y === void 0) { y = 4; }
    return x > y ? x : y;
}
maxDefault(100);
// 剩余参数（类似多个可选参数，使用...扩展符号）
function sumRest(a) {
    var restParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restParams[_i - 1] = arguments[_i];
    }
    var result = a;
    for (var i = 0; i < restParams.length; i++) {
        result += restParams[i];
    }
    return result;
}
sumRest(1, 2, 4, 6);
function fnOverload(config, value) {
    if (typeof config === 'string') {
        console.log('config is string');
    }
    else if (typeof config === 'object') {
        console.log('config is object');
    }
}
// 箭头函数（关键点：this；this在函数创建的时候就绑定了this而不是在函数调用时）
var arrowFn = {
    aObj: { a: 1 },
    getObj: function () {
        var _this = this;
        return function () {
            return _this.aObj.a;
        };
    }
};
console.log(arrowFn.getObj()());
