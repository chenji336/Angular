// tsc 03.声明和结构.ts

// ---------------数组解构------------------
// 常用
let input = [1, 2];
let [first, second] = input;
// 交换
[first, second] = [second, first];
// 函数参数默认值（后面如果[number,number]）会提示找不到number这个变量
function fn([a,b] = [1, 2]) {
	console.log(first + second);
}

let [rest1, ...rest] = [1, 2, 3, 4];


// ---------------对象------------------
let {x, y, width, height} = {x: 100, y: 100, width: 1000, height: 2000};