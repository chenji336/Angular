import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'todo/ALL',
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

export const routing = RouterModule.forRoot(routes);


