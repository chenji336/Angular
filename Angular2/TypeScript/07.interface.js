// tsc 07.interface.ts
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
