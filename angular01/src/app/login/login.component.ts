import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auth } from '../domain/entities';
// import {AuthService} from '../core/auth.service';

// 没有使用双向绑定如何取值
/* <div>
    <input #usernameRef type="text">
    <input #passwordRef type="password">
    <button (click)='onClick(usernameRef.value, passwordRef.value)'>Login</button>
  </div> */

  // 使用#usernameRef，那么可以在template里面调用该元素（usernameRef.value则可以找到这个input的value值）
  // 双向绑定：[(ngModel)] = 'username' 需要先定义username，这样就可以this.username进行访问了

  // 表单数据验证：#usernameRef='directive'，否则报错（也可以不使用=，但是这样就不能使用表单验证。不过可以查看到value值）
  // |（管道操作）可以进行过滤和一些匹配（类似于json方法中使用）
  // 如果使用form，ngModel会注册为form的子控件，需要添加name
  // 如果没有ngForm,那么formRef.value=undefined(ngForm跟ngModel对应起来) 
  // fieldset 使用之后formRef.value最外面的对象就是fieldset的ngModelGroup名称了
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
        /> {{usernameRef.valid}}--{{usernameRef.errors | json}}--{{usernameRef.value}}
        <div *ngIf="usernameRef.errors?.required">this is required</div>
        <div *ngIf="usernameRef.errors?.minlength">should be at least 3 charactors</div><br>
        <input type="password" required
          name="password"
          [(ngModel)]="password"
          #passwordRef='ngModel'
        /> {{passwordRef.valid}}<br>
        <button 
          type="submit"
          [@loginState]="loginBtnState"
          (mouseenter)="toggleLoginState(true)"
          (mouseleave)="toggleLoginState(false)"
        >Submit</button>
        <div *ngIf="auth?.hasError">{{auth.errMsg}}</div>
      </fieldset>
    </form>
  </div>
  `,
  // ng-invalid（valid）是ng自带的样式，我们可以在此基础上进行修改
  styles: [`
    input.ng-invalid{
      border: 3px solid red;
    }
    input.ng-valid{
      border: 3px solid green;
    }
  `],
  animations:[
    // trigger('loginState', [
    //   state('inactive', style({
    //     transform: 'scale(1)'
    //   })),
    //   state('active',style({
    //     transform: 'scale(1.2)'
    //   })),
    //   transition('inactive => active',animate('100ms ease-in')),
    //   transition('active => inactive',animate('100ms ease-out'))
    // ])
    trigger('loginState', [
      transition('inactive => active', [
        style({
          backgroundColor: '#cfd8dc',
          transform: 'scale(1.3)'
        }),
        animate('80ms ease-in', style({
          backgroundColor: '#eee',
          transform: 'scale(1)'
        }))
      ])
    ])
  ],
  providers: []
})

export class LoginComponent implements OnInit {

  username = '';
  password = '';
  auth: Auth;

  loginBtnState: string = 'inactive';

  constructor(@Inject('auth') private service, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(formValue) {
    console.log(formValue);
    this.service
      .loginWithCredentials(this.username, this.password)
      /* .then(auth => {
        let redirectUrl = (auth.redirectUrl === null)? '/': auth.redirectUrl;
        if(!auth.hasError){
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      }); */
      .subscribe(auth => {
        this.auth = Object.assign({}, auth);
        if (!auth.hasError) {
          this.router.navigate(['todo']);
        }
      });
  }

  toggleLoginState(state: boolean){
    this.loginBtnState = state ? 'active' : 'inactive';
  }
}
