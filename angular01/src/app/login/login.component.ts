import { Component, OnInit, Inject } from '@angular/core';
// import {AuthService} from '../core/auth.service';

// 没有使用双向绑定如何取值
/* <div>
    <input #usernameRef type="text">
    <input #passwordRef type="password">
    <button (click)='onClick(usernameRef.value, passwordRef.value)'>Login</button>
  </div> */

@Component({
  selector: 'app-login',
  template: `
  <div>
    <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
      <fieldset ngModelGroup="login">
        <input type="text"
          required minlength='3'
          name="username"
          [(ngModel)]="username"
          #usernameRef='ngModel'
        /> {{usernameRef.valid}}--{{usernameRef.errors | json}}
        <div *ngIf="usernameRef.errors?.required">this is required</div>
        <div *ngIf="usernameRef.errors?.minlength">should be at least 3 charactors</div>
        <input type="password" required
          name="password"
          [(ngModel)]="password"
          #passwordRef='ngModel'
        /> {{passwordRef.valid}}
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  </div>
  `,
  styles: [`
    input.ng-invalid{
      border: 3px solid red;
    }
    input.ng-valid{
      border: 3px solid green;
    }
  `],
  providers: []
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  constructor(@Inject('auth') private service) {
  }

  ngOnInit() {
  }

  // 事件
  onClick() {

  }

  onSubmit(formValue) {
    console.log('auth result is:', this.service.loginWithCredentials(this.username, this.password));
    console.log('formValue:', formValue);
  }

}
