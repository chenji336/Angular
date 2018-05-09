import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';

// 公用的服务放在app.module中，如果是单独使用的放在componet也没啥问题
import { AuthService } from './core/auth.service';
import { RouterModule } from '@angular/router'

import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';
import { LoginModule } from './login/login.module';
import {routing} from './app.routes';
// 推荐使用router module形式
import { AppRoutingModule } from './app-routing.module';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryTodoDbService } from './todo/todo-data';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // HttpModule,InMemoryWebApiModule.forRoot(InMemoryTodoDbService),
    // routing,
    AppRoutingModule,
    TodoModule,
    CoreModule,
    LoginModule
  ],
  providers: [ 
    { provide: 'auth', useClass: AuthService }
    // AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
