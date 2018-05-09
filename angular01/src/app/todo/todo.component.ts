import { Component, OnInit, Inject } from '@angular/core';
import {Todo} from '../domain/entities';
// import {TodoService} from './todo.service';

import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [] // TodoService
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';
  constructor(
    @Inject('todoService') private service,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let filter = params['filter'];
      this.filterTodos(filter);
    })
  }

  // 自己调用的方法
  addTodo(){
    this.service
    .addTodo(this.desc)
    .then(todo => {
      this.todos = [...this.todos, todo];
      this.desc = '';
    });
  }
  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0,i),
          t,
          ...this.todos.slice(i+1)
        ];
        return null;
      });
  }
  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .deleteTodoById(todo.id)
      .then(()=> {
        this.todos = [
          ...this.todos.slice(0,i),
          ...this.todos.slice(i+1)
        ];
        return null;
      });
  }
  getTodos(): void {
    this.service
      .getTodos()
      .then(todos => this.todos = [...todos]);
  }

  filterTodos(filter: string): void{
    this.service
      .filterTodos(filter)
      .then(todos => this.todos = [...todos]);
  }

  // 子组件触发的
  onTextChanges(value) {
    this.desc = value;
  }
  toggleAll(){
    // this.todos.forEach(todo => this.toggleTodo(todo)); // 这个是同步的，要一个一个调用http
    // 使用promise.all全部调用成功后再执行
    Promise.all(this.todos.map(todo => this.toggleTodo(todo)));
  }

  clearCompleted(){
    // 跟上面一样，会同步调用http
    /* const todos = this.todos.filter(todo=> todo.completed===true);
    todos.forEach(todo => this.removeTodo(todo)); */

    // 使用promise.all全部调用成功后再执行
    const completed_todos = this.todos.filter(todo => todo.completed === true);
    const active_todos = this.todos.filter(todo => todo.completed === false);
    Promise.all(completed_todos.map(todo => this.service.deleteTodoById(todo.id)))
      .then(() => this.todos = [...active_todos]);
  }
}
