import { BrowserModule } from '@angular/platform-browser'; // 引入的BrowserModule可以让所有的都可用，其他模块只要引入commonModule即可
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';

// 公用的服务放在app.module中，如果是单独使用的放在componet也没啥问题
import { AuthService } from './core/auth.service';

import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';
import { LoginModule } from './login/login.module';

// 推荐使用router module形;
import { AppRoutingModule } from './app-routing.module';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryTodoDbService } from './todo/todo-,

import { MatButtonModule, MatCheckboxModule } from '@angular/material';

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
    LoginModule,

    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: 'auth', useClass: AuthService }
    // AuthService // 使用这种可以有类型约束（没有provide则不能@inject）
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
