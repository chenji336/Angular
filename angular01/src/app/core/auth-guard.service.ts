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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //取得用户访问的URL
    let url: string = state.url;
    return this.authService.getAuth()
      .pipe(map((auth:any) => !auth.hasError));
  }

  canLoad(route: Route): Observable<boolean> {
    let url = `/${route.path}`;

    return this.authService.getAuth()
      .pipe(map((auth: any) => !auth.hasError));
  }

  checkLogin(url: string): boolean {
    //如果用户已经登录就放行
    if (localStorage.getItem('userId') !== null) { return true; }
    //否则，存储要访问的URl到本地
    localStorage.setItem('redirectUrl', url);
    //然后导航到登陆页面
    this.router.navigate(['/login']);
    //返回false，取消导航
    return false;
  }
}
