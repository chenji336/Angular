// tsc 06.module.ts
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// ------------------------------导出------------------------------------
// 1.导出声明
exports.COMPANY = 'GF'; // 导出变量
var ErpIdentityValidate = (function () {
    function ErpIdentityValidate() {
    }
    ErpIdentityValidate.prototype.isGfStaff = function (erp) {
        return ''.indexOf(erp) === -1 ? false : true; // 判断是否为内部员工
    };
    return ErpIdentityValidate;
}());
exports.ErpIdentityValidate = ErpIdentityValidate;
// 2.导出语句
var NewErpIdentityValidate = (function () {
    function NewErpIdentityValidate() {
    }
    NewErpIdentityValidate.prototype.isGfStaff = function (erp) {
        return ''.indexOf(erp) === -1 ? false : true; // 判断是否为内部员工
    };
    return NewErpIdentityValidate;
}());
exports.NewErpIdentityValidate = NewErpIdentityValidate;
exports.GfIdentityValidate = NewErpIdentityValidate;
// 3.模块包装（对已有模块进行引入再修改或则扩展）
var ModuleErpIdentityValidate = (function () {
    function ModuleErpIdentityValidate() {
    }
    ModuleErpIdentityValidate.prototype.isGfStaff = function (erp) {
        return ''.indexOf(erp) === -1 ? false : true; // 判断是否为内部员工
    };
    return ModuleErpIdentityValidate;
}());
// 导出06.ErpIdentityValidate下面的ErpIdentityValidate模块
var _06_ErpIdentityValidate_1 = require('./06.ErpIdentityValidate');
exports.RegExpBasedZipCodeValidate = _06_ErpIdentityValidate_1.ErpIdentityValidate;
// 下面就是导出所有模块
__export(require('./06.ErpIdentityValidate'));
var validator = require('./06.ErpIdentityValidate'); // 导入全部 
var ErpNew = validator.ErpIdentityValidate;
