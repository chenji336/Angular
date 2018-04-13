// tsc --target ES5 --experimentalDecorators 08.decorators.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// ---------------------方法装饰器--------------------------
var TestClass = (function () {
    function TestClass() {
    }
    TestClass.prototype.testMethod = function (arg) {
        return 'logMsg:' + arg;
    };
    __decorate([
        log
    ], TestClass.prototype, "testMethod", null);
    return TestClass;
}());
// 方法装饰器@log的实现
// target: TestClass.prototype
// propertyKey: 'testMethod'
// descriptor: Object.getOwnPropertyDescriptor(TestClass.prototype,'testMethod')
function log(target, propertyKey, descriptor) {
    // descriptor.value就是testMethod方法
    var origin = descriptor.value;
    // 改写testMethod方法，参数不变
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log('args:', JSON.stringify(args)); // 调用前
        var result = origin.apply(this, args); // 调用中(调用方法)
        console.log('The Result-' + result); // 调用后
        return result;
    };
    return descriptor;
}
// 下面代码进行测试
new TestClass().testMethod('test mothod decorator');
// ---------------------类装饰器--------------------------
// 如果有红线但是能编译通过不要在意
var Person = (function () {
    function Person(firstName, secondName) {
        this.firstName = firstName;
        this.secondName = secondName;
    }
    Person = __decorate([
        Component({
            selector: 'person',
            template: 'person.html'
        })
    ], Person);
    return Person;
}());
function Component(component) {
    return function (target) {
        return ComponentClass(target, component);
    };
}
function ComponentClass(target, component) {
    var original = target;
    // 处理原型链(constructor和original的不同之处？)
    function construct(constructor, args) {
        var c = function () {
            // 这里的return有无没影响（以后如果测出来有影响可以在进行注释说明）
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        // return需要，否则p会有问题
        return new c();
    }
    // 打印参数
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log('selector:', component.selector);
        console.log('template:', component.template);
        console.log("Person:" + original.name + "(" + JSON.stringify(args) + ")");
        return construct(original, args);
    };
    f.prototype = original.prototype;
    return f; // 返回构造函数
}
// 使用下面代码测试(这里有红色是因为tsconfig.json全局进行搜索了，发现了相同的别的ts文件中已经定义了Person)
var p = new Person('Angular', 'JS');
// ---------------------参数装饰器--------------------------
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.login = function (name) { };
    __decorate([
        __param(0, inject)
    ], UserService.prototype, "login", null);
    return UserService;
}());
// 下面会自动执行
function inject(target, propertyKey, parameterIndex) {
    console.log('target:', target); // 类的原型。如果参数是static那么就是构造函数
    console.log('propertyKey:', propertyKey); // 登录名称login
    console.log('parameterIndex:', parameterIndex); // 0
}
// ---------------------装饰器组合--------------------------
function ComponentCP(component) {
    console.log('selector:', component.selector);
    console.log('template:', component.template);
    console.log('component init');
    return function (target) {
        console.log('component call');
        return target;
    };
}
function Directive() {
    console.log('directive init');
    return function (target) {
        console.log('directive call');
        return target;
    };
}
var PersonCP = (function () {
    function PersonCP(firstName, secondName) {
        this.firstName = firstName;
        this.secondName = secondName;
    }
    PersonCP = __decorate([
        ComponentCP({
            selector: 'person',
            template: 'person.html'
        }),
        Directive()
    ], PersonCP);
    return PersonCP;
}());
var pCP = new PersonCP('Angular', 'JS');
