// tsc 04.function.ts

// 函数声明写法
function maxA(x: number, y: number): number {
	return x > y ? x : y;
}
maxA(1, 3);
// 函数表达式写法
let maxB = function(x: number, y: number): number {
	return x > y ? x : y;
}
maxB(1, 2);

// 可选参数 y?:(?理解成正则表达式的0-1) 必须在必须参数后面
function maxOption(x: number, y?: number): number {
	if (y) {
		return x > y ? x : y;
	}
	return x;
}
maxOption(1);

// 默认参数（传入undefined的时候也取的默认参数;如果在默认参数在前面，要显示的传入undefined）
function maxDefault(x: number, y = 4): number {
	return x > y ? x : y;
}
maxDefault(100);

// 剩余参数（类似多个可选参数，使用...扩展符号）
function sumRest(a: number, ...restParams: number[]): number {
	let result: number = a;
	for(let i = 0; i < restParams.length; i++) {
		result += restParams[i];
	}
	return result;
}
sumRest(1, 2, 4, 6);

// 函数重载（参数类型不同进行不同操作）
function fnOverload(config: {});
function fnOverload(config: string, value?: string) { // 这里value没有？就会提示错误
	if (typeof config === 'string') {
		console.log('config is string');
	} else if(typeof config === 'object') {
		console.log('config is object');
	}
}

// 箭头函数（关键点：this；this在函数创建的时候就绑定了this而不是在函数调用时）
let arrowFn = {
	aObj : {a: 1},
	getObj: function() {
		return () => {
			return this.aObj.a;
		}
	}
};
console.log(arrowFn.getObj()());