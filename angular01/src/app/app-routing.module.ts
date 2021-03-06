import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { LoginComponent } from './login/login.component';
// import { TodoComponent } from './todo/todo.component';
import { AuthGuardService } from './core/auth-guard.service';

// Router匹配顺序很重要，优先匹配第一个（switch）
// path redirectTo pathMatch
export const routes: Routes = [ 
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full' // 必须完全符合路径要求（exact)
    },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    {
        path: 'todo',
        redirectTo: 'todo/ALL', // 通过redirectTo直接跳转，这个时候可以不用引入TodoComponent组件
        canLoad: [AuthGuardService] // canActive是用于是否进入url，canLoad代表是否加载url对应的模块
    }
];

// 路由模块话，在本例子中用处并不大（只是官方推荐而已）
@NgModule({
    imports: [
        RouterModule.forRoot(routes,{ useHash: true }) // 如果在生产环境运行的话，需要执行这行
        // RouterModule.forRoot(routes) // routes的引入需要RouterModule.forRoot，放在imports中
    ],
    exports: [
        RouterModule // 这个RouterModule不能省去
    ],
   
})
export class AppRoutingModule { }


