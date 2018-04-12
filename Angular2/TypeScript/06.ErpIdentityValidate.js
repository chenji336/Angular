"use strict";
var ErpIdentityValidate = (function () {
    function ErpIdentityValidate() {
    }
    ErpIdentityValidate.prototype.isGfStaff = function (erp) {
        return ''.indexOf(erp) === -1 ? false : true; // 判断是否为内部员工
    };
    return ErpIdentityValidate;
}());
exports.ErpIdentityValidate = ErpIdentityValidate;
