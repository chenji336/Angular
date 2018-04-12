// tsc 2.baseType.ts

// boolean类型
let flag: boolean = true;
// flag = 'false'; // 编译的时候会报错，不编译的时候也有红色波浪线提示
flag = false

// number类型
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制
let decLiteral: number = 6; // 十进制
let hexLiteral: number = 0xf00d; // 十六进制

// string类型
let userName: string = '陈骥';
let years: number = 5;
console.log(`${userName} love you ${years} years`);

// 数组类型
let arr: number[] = [1 , 2, 3];
let arrGenericity: Array<number> = [1 , 2, 3];

// 元组类型
let x: [string, number] = ['chenji', 28];

// 枚举类型
enum Color {Red, Green, Blue}; // 默认是从0开始算起
let c: Color = Color.Green;
console.log('c: Color', c); // 0

enum ColorDefine {Red = 2, Green, Blue = 6}; // 自己定义数字
let cDefine: ColorDefine = ColorDefine.Green;
console.log('cDefine:', cDefine); // 3

// 任意类型 any（编译情况下不会报错）
// 使用的三种场景
// 1.变量的值会动态改变
let a: any = 100;
a = '趁机';
a = true;
// 2.运行时可能存在，编译时候不检查
a.ifItExists();
// 3.定义存储各种类型
let aUnknow: any = ['趁机', false, 100];
aUnknow[1] = false;

// undefined 和 null
// 启用--strictNullChecks
let und: number = 100;
und = undefined; // 错误

let und2: number | null | undefined = 100;
und2 = null; // 正确

// void类型
// 表明函数返回没有值
function helloWorld(): void {
	console.log('i have no returnValue')
}

function func(foo: () => void) { // foo表示一个没有返回值的函数
	let f = foo;
	//f.doSth(); // 报错，因为void代表没有返回值（如果设置any的话则不报错）
}

// never类型
let nev: never;
let y: number;
// nev = 123; // never类型不能赋值number
nev = (() => {throw new Error('exception occur')})(); // never类型可以赋值给never类型
y = nev; // never类型可以赋值给number类型
function error(message: string): never { // 返回值为never的函数可以是抛出异常的情况
	throw new Error(message);
}
function loop(): never { // 返回值是never的函数可以是无法被执行到终点的情况
	while(true) {}
}