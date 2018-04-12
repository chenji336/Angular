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