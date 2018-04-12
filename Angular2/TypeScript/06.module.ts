// tsc 06.module.ts

// ------------------------------导出------------------------------------
// 1.导出声明
export const COMPANY = 'GF'; // 导出变量
export interface IdentityValidate { // 导出接口
	isGfStaff(s: string): boolean;
}
export class ErpIdentityValidate implements IdentityValidate { // 导出类
	isGfStaff(erp: string): boolean {
		return ''.indexOf(erp) === -1 ? false : true; // 判断是否为内部员工
	}
}
// 2.导出语句
class NewErpIdentityValidate implements IdentityValidate { // 导出类
	isGfStaff(erp: string): boolean {
		return ''.indexOf(erp) === -1 ? false : true; // 判断是否为内部员工
	}
}
export {NewErpIdentityValidate};
export {NewErpIdentityValidate as GfIdentityValidate};
// 3.模块包装（对已有模块进行引入再修改或则扩展）
class ModuleErpIdentityValidate implements IdentityValidate { // 导出类
	isGfStaff(erp: string): boolean {
		return ''.indexOf(erp) === -1 ? false : true; // 判断是否为内部员工
	}
}
// 导出06.ErpIdentityValidate下面的ErpIdentityValidate模块
export {ErpIdentityValidate as RegExpBasedZipCodeValidate} from './06.ErpIdentityValidate';
// 下面就是导出所有模块
export * from './06.ErpIdentityValidate';
// export * from '../other' //这样export相当于累加了（可以看编译后的源码）


// ------------------------模块导入方式----------------------------------
// import {ErpIdentityValidate} from './06.ErpIdentityValidate'; // 导入模块
import {ErpIdentityValidate as Erp} from './06.ErpIdentityValidate'; // 别名导入
import * as validator from './06.ErpIdentityValidate';  // 导入全部 
let ErpNew = validator.ErpIdentityValidate;