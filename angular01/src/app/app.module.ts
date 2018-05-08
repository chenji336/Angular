import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing} from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';

// 公用的服务放在app.module中，如果是单独使用的放在componet也没啥问题
import { AuthService } from './core/auth.service';
import { RouterModule } from '@angular/router'

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTodoDbService } from './todo/todo-data';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,InMemoryWebApiModule.forRoot(InMemoryTodoDbService),
    routing
  ],
  providers: [ 
    { provide: 'auth', useClass: AuthService }
    // AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
