// tsc 05.class.ts
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 例子（汽车的行为写到一个类中---封装）
var Car = (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.drive = function (distanceInmeters) {
        if (distanceInmeters === void 0) { distanceInmeters = 0; }
        console.log("A car runs " + distanceInmeters + "m powered by " + this.engine);
    };
    return Car;
}());
var car = new Car('petrol');
car.drive();
// 继承和多态（继承extend；多态也叫作重写，重写父类的方法，表现出不同的状态）
var MotoCar = (function (_super) {
    __extends(MotoCar, _super);
    function MotoCar(engine) {
        _super.call(this, engine);
    }
    return MotoCar;
}(Car));
var JeepCar = (function (_super) {
    __extends(JeepCar, _super);
    function JeepCar(engine) {
        _super.call(this, engine);
    }
    JeepCar.prototype.dirve = function (distanceInmeters) {
        if (distanceInmeters === void 0) { distanceInmeters = 100; }
        console.log('Jeep...');
        _super.prototype.drive.call(this);
    };
    return JeepCar;
}(Car));
var tesla = new MotoCar('electricity');
tesla.drive();
var landRover = new JeepCar('petrol');
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
var Grid = (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
console.log('Grid.origin:', Grid.origin);
// 抽象类
var Person = (function () {
    function Person() {
    }
    Person.prototype.walking = function () {
        console.log('walking on the road');
    };
    return Person;
}());
var Male = (function (_super) {
    __extends(Male, _super);
    function Male() {
        _super.apply(this, arguments);
    }
    Male.prototype.speak = function () {
        console.log('How are you?');
    };
    return Male;
}(Person));
var person;
// person = new Person(); // error,抽象类不能实例化
person = new Male();
person.speak();
person.walking();
