// tsc --target ES5 --experimentalDecorators 08.decorators.ts

// ---------------------方法装饰器--------------------------
class TestClass {
	@log
	testMethod(arg: string) {
		return 'logMsg:' + arg;
	}
}

// 方法装饰器@log的实现
// target: TestClass.prototype
// propertyKey: 'testMethod'
// descriptor: Object.getOwnPropertyDescriptor(TestClass.prototype,'testMethod')
function log(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
	// descriptor.value就是testMethod方法
	let origin = descriptor.value;
	// 改写testMethod方法，参数不变
	descriptor.value = function(...args: any[]) {
		console.log('args:',JSON.stringify(args)); // 调用前
		let result = origin.apply(this, args); // 调用中(调用方法)
		console.log('The Result-' + result); // 调用后
		return result;
	}
	return descriptor;
}
// 下面代码进行测试
new TestClass().testMethod('test mothod decorator');

// ---------------------类装饰器--------------------------
// 如果有红线但是能编译通过不要在意
@Component({
	selector: 'person',
	template: 'person.html'
})
class Person {
	constructor(
		public firstName: string, 
		public secondName: string
	){}
}
function Component(component) {
	return (target: any) => {
		return ComponentClass(target, component);
	}
}
function ComponentClass(target: any, component?: any): any {
	let original = target;
	// 处理原型链(constructor和original的不同之处？)
	function construct(constructor, args) {
		let c: any = function() {
			// 这里的return有无没影响（以后如果测出来有影响可以在进行注释说明）
			return constructor.apply(this, args);
		}
		c.prototype = constructor.prototype;
		// return需要，否则p会有问题
		return new c();
	}

	// 打印参数
	let f: any = (...args) => {
		console.log('selector:', component.selector);
		console.log('template:', component.template);
		console.log(`Person:${original.name}(${JSON.stringify(args)})`);
		return construct(original, args);
	};
	f.prototype = original.prototype;
	return f; // 返回构造函数
}
// 使用下面代码测试(这里有红色是因为tsconfig.json全局进行搜索了，发现了相同的别的ts文件中已经定义了Person)
let p = new Person('Angular','JS');

// ---------------------参数装饰器--------------------------
class UserService {
	login(@inject name: string){}
}
// 下面会自动执行
function inject(target: any, propertyKey: string | symbol, parameterIndex: number) {
	console.log('target:', target); // 类的原型。如果参数是static那么就是构造函数
	console.log('propertyKey:', propertyKey); // 登录名称login
	console.log('parameterIndex:', parameterIndex); // 0
}

// ---------------------装饰器组合--------------------------
function ComponentCP(component) {
	console.log('selector:', component.selector);
	console.log('template:', component.template);
	console.log('component init');
	return (target: any) => {
		console.log('component call');
		return target;
	}
}
function Directive() {
	console.log('directive init');
	return (target: any) => {
		console.log('directive call');
		return target;
	}
}
@ComponentCP({
	selector: 'person',
	template: 'person.html'
})
@Directive()
class PersonCP {
	constructor(
		public firstName: string, 
		public secondName: string
	){}
}
let pCP = new PersonCP('Angular', 'JS');