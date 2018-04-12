// 06.ErpIdentityValidate.ts
export interface IdentityValidate { // 导出接口
	isGfStaff(s: string): boolean;
}
export class ErpIdentityValidate implements IdentityValidate { // 导出类
	isGfStaff(erp: string): boolean {
		return ''.indexOf(erp) === -1 ? false : true; // 判断是否为内部员工
	}
}