/* import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; */
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { routing } from './todo.routes'
import { TodoRoutingModule } from './todo-routing.module'

import { TodoComponent } from './todo.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoService } from './todo.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  imports: [
    /* CommonModule,
    FormsModule,
    HttpModule, */
    SharedModule,
    // routing,
    TodoRoutingModule,
  ],
  declarations: [
    TodoComponent,
    TodoFooterComponent,
    TodoHeaderComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  providers: [
    {provide: 'todoService', useClass: TodoService}
    ]
})
export class TodoModule {}