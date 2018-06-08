import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
  Route,
  RouteReuseStrategy
} from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    @Inject('auth') private authService
  ) { }

  // 只有canActive返回是true的时候才会跳转到下个路由，否则不做反应
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //取得用户访问的URL
    let url: string = state.url;
    // this.authService.subject.next({});
    /* return this.authService.getAuth()
      .pipe(map((auth:any) => {
        console.log(auth); // 没有subscribe不会触发
        return auth.hasError
      }
      )); */
    if (this.authService.auth.hasError) {
      this.router.navigate(['/login']); // 发现错误跳转到login页面
    }
    return !this.authService.auth.hasError;
  }

  // 看一下什么时候触发canLoad
  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;

    return this.authService.getAuth()
      .pipe(map((auth: any) => !auth.hasError));
  }

  /* checkLogin(url: string): boolean {
    //如果用户已经登录就放行
    if (localStorage.getItem('userId') !== null) { return true; }
    //否则，存储要访问的URl到本地
    localStorage.setItem('redirectUrl', url);
    //然后导航到登陆页面
    this.router.navigate(['/login']);
    //返回false，取消导航
    return false;
  } */
}
