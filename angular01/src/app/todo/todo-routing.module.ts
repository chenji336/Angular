import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';

import { AuthGuardService } from '../core/auth-guard.service';

const routes: Routes = [
  {
    path: 'todo/:filter',
    canActivate: [AuthGuardService], // 访问之前会执行AuthGuardService
    component: TodoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    // RouterModule.forRoot(routes, { useHash: true }) // 使用hash路由
  ],
  exports: [RouterModule]
})
export class TodoRoutingModule { }