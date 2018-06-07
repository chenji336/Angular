import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';
import {AuthGuardService} from '../core/auth-guard.service';

export const routes: Routes = [
  {
    path: 'todo/:filter', // :添加参数，可以用来传递
    canActivate: [AuthGuardService],
    component: TodoComponent
  }
];
export const routing = RouterModule.forChild(routes); // 子路由使用RouterModule.forChild