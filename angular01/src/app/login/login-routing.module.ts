import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
      path: 'register',
      component: RegisterDialogComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LoginRoutingModule { }
