import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'todo',
        redirectTo: 'todo/ALL'
    }
];

@NgModule({
    imports: [
        // RouterModule.forRoot(routes,{ useHash: true }) // 如果在生产环境运行的话，需要执行这行
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule // 这个RouterModule不能省去
    ]
})
export class AppRoutingModule { }


