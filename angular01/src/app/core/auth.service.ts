import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable, ReplaySubject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise';
import { Auth } from '../domain/entities';

@Injectable()
export class AuthService {

  auth: Auth = { hasError: true, redirectUrl: '', errMsg: 'not logged in', user: null };
  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);

  // 使用DI（依赖注入），这样实例化就不需要去设置参数了（比如constructor参数改变也无需理会）
  constructor(private http: Http, @Inject('user') private userService) { } 

  getAuth(): Observable<Auth> {
    return this.subject.asObservable();
  }

  unAuth(): void {
    this.auth = Object.assign(
      {},
      this.auth,
      { user: null, hasError: true, redirectUrl: '', errMsg: 'not logged in' });
    this.subject.next(this.auth);
  }

  register(username: string, password: string): Observable<Auth> {
    let toAddUser = {
      username: username,
      password: password
    };
    return this.userService
      .findUser(username)
      .pipe(
        filter(user => user === null), 
        switchMap(user => {
          return this.userService.addUser(toAddUser).pipe(map((u: any) => {
            this.auth = Object.assign(
              {},
              { user: u, hasError: false, errMsg: null, redirectUrl: null }
            );
            this.subject.next(this.auth);
            return this.auth;
          }));
      })
    )
  }

  loginWithCredentials(username: string, password: string): Observable<Auth> {
    return this.userService
      .findUser(username)
      .pipe(map((user: any) => { // 这里为啥又能使用map了，不需要pipe进行包装吗？
        let auth = new Auth();
        /* localStorage.removeItem('userId');
        let redirectUrl = (localStorage.getItem('redirectUrl') === null) ?
          '/' : localStorage.getItem('redirectUrl');
        auth.redirectUrl = redirectUrl; */
        if (null === user) {
          auth.user = null;
          auth.hasError = true;
          auth.errMsg = 'user not found';
        } else if (password === user.password) {
          auth.user = user;
          // auth.user = Object.assign({}, user);
          auth.hasError = false;
          localStorage.setItem('userId', user.id);
        } else {
          auth.user = null;
          auth.hasError = true;
          auth.errMsg = 'password not match';
        }

        this.auth = Object.assign({}, auth);
        this.subject.next(this.auth);
        return this.auth;
      }));
    // .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}