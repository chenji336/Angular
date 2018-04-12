// tsc 05.class.ts

// 例子（汽车的行为写到一个类中---封装）
class Car {
	engine: string; // 不需要let const
	constructor(engine: string) { // constructor构造函数关键字
		this.engine = engine;
	}
	drive(distanceInmeters: number = 0) { // 方法
		console.log(`A car runs ${distanceInmeters}m powered by ${this.engine}`);
	}
}

let car = new Car('petrol');

car.drive();

// 继承和多态（继承extend；多态也叫作重写，重写父类的方法，表现出不同的状态）
class MotoCar extends Car {
	constructor(engine: string) {
		super(engine);
	}
}
class JeepCar extends Car {
	constructor(engine: string) {
		super(engine);
	}
	dirve(distanceInmeters: number = 100) { // 实现多态了，重写父类的方法，表现形式不一样
		console.log('Jeep...');
		super.drive();
	}
}

let tesla = new MotoCar('electricity');
tesla.drive();

let landRover: Car = new JeepCar('petrol');
landRover.drive(200);

// 修饰符(public、private、protected)
// 默认是public
// 如果private engine: string;那么下面car.engine报错
// console.log('car.engine:', car.engine)
// 如果engine是private，那么派生类中也不能调用，protected派生类可以调用
// console.log(this.engine);

// 参数属性(合二为一)
// class Car {
// 	engine: string; // 不需要let const
// 	constructor(engine: string) { // constructor构造函数关键字
// 		this.engine = engine;
// 	}
// 	constructor(public engine: string) {}
// }

// 静态属性(static)
class Grid {
	public static origin = {x: 0, y: 0};
	constructor(public scale: number) {}
	calculateDistanceFromOrigin(point: {x: number,y: number}) {
		let xDist = (point.x - Grid.origin.x);
		let yDist = (point.y - Grid.origin.y);
		return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
	}
}
console.log('Grid.origin:', Grid.origin);

// 抽象类
abstract class Person {
	abstract speak(): void;
	walking(): void {
		console.log('walking on the road');
	}
}

class Male extends Person {
	speak(): void {
		console.log('How are you?');
	}
}

let person: Person;
// person = new Person(); // error,抽象类不能实例化
person = new Male();
person.speak();
person.walking();