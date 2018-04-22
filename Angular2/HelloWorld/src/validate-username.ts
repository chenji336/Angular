import {FormControl} from '@angular/forms';
const EMAIL_REGEXP = new RegExp('[a-z0-9]+@[a-z0-9]+.com');
const TEL_REGEXP = new RegExp('1[0-9]{10}');

export function validateUserName(c: FormControl) {
	return (EMAIL_REGEXP.test(c.value) || TEL_REGEXP.test(c.value)) ? null :{
		userName: {
			valid: false,
			errorMsg: '用户名必须是手机号码或则邮箱账号'
		}
	}
}