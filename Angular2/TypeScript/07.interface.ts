// tsc 07.interface.ts

// -----------------属性类型接口----------------
interface FullName {
	firstName: string,
	secondName?: string
}
let myObj = {age: 10, firstName: '陈', secondName: '骥'};
function PrintLabel(name: FullName) {
	console.log(name.firstName, name.secondName);
}
PrintLabel(myObj);

function PrintLabel2(name: {firstName: string, secondName: string}){
	console.log(name.firstName, name.secondName);
}

PrintLabel2(myObj);

// -----------------函数类型接口----------------
interface encrypt {
	(val: string, salt: string): string;
}
let md5: encrypt;
md5 = function(psw: string, uName: string) {
	return uName;
}

// -----------------可索引类型接口----------------
// 类似Array Object带索引的
interface UserArray {
	[aaa: number]: string;
}
interface UserObject {
	[index: string]: string;
}
let userArray: UserArray;
let userObject: UserObject;
userArray = ['张三', '李四'];
userObject = {name: '张三'};

// -----------------类类型接口----------------
interface Animal {
	name: string;
	setName(n: string): void;
}
class Dog implements Animal {
	name: string;
	setName(n: string): void {
		this.name = n;
	}
	constructor(n: string) {}
}

// -----------------接口扩展----------------
interface Animal2 {
	eat(): void;
}
interface Person extends Animal2 {
	talk(): void;
}
class Programmer {
	coding(): void {
		console.log('typescript is the best language');
	}
}
class ITGirl extends Programmer implements Person {
	// 接口的两个方法必须实现
	eat() {
		console.log('animal eat');
	}
	talk() {
		console.log('person talk');
	}
	// 继承的可以不重写(多态)
	coding(): void {
		console.log('i am girl, but i like coding')
	}
}