// tsc 07.interface.ts
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var myObj = { age: 10, firstName: '陈', secondName: '骥' };
function PrintLabel(name) {
    console.log(name.firstName, name.secondName);
}
PrintLabel(myObj);
function PrintLabel2(name) {
    console.log(name.firstName, name.secondName);
}
PrintLabel2(myObj);
var md5;
md5 = function (psw, uName) {
    return uName;
};
var userArray;
var userObject;
userArray = ['张三', '李四'];
userObject = { name: '张三' };
var Dog = (function () {
    function Dog(n) {
    }
    Dog.prototype.setName = function (n) {
        this.name = n;
    };
    return Dog;
}());
var Programmer = (function () {
    function Programmer() {
    }
    Programmer.prototype.coding = function () {
        console.log('typescript is the best language');
    };
    return Programmer;
}());
var ITGirl = (function (_super) {
    __extends(ITGirl, _super);
    function ITGirl() {
        _super.apply(this, arguments);
    }
    // 接口的两个方法必须实现
    ITGirl.prototype.eat = function () {
        console.log('animal eat');
    };
    ITGirl.prototype.talk = function () {
        console.log('person talk');
    };
    // 继承的可以不重写(多态)
    ITGirl.prototype.coding = function () {
        console.log('i am girl, but i like coding');
    };
    ITGirl.prototype.speak = function () {
    };
    ITGirl.prototype.walking = function () { };
    return ITGirl;
}(Programmer));
