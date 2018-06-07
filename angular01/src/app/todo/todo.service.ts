import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Todo } from './todo.model';
import { UUID } from 'angular2-uuid';

import {} from 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService {

  // todos: Todo[] = [];
  //定义你的假WebAPI地址，这个定义成什么都无所谓
  //只要确保是无法访问的地址就好
  // private api_url = 'api/todos';
  private api_url = 'http://localhost:3000/todos';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  // POST /todos
  addTodo(todoItem: string): Promise<Todo> { // 返回的数据应该是Promise类型，并且参数是Todo类型
    // + 可以把string转成number
    const userId: number = +localStorage.getItem('userId');
    let todo = {
      id: UUID.UUID(), //UUID唯一标识
      desc: todoItem,
      completed: false,
      userId
    };
    return this.http
            .post(this.api_url, JSON.stringify(todo), {headers: this.headers}) // url、要传的数据（需要格式化成json）、头数据
            .toPromise() // 本来是observable,使用toPromise改成Promise
            .then(res => {
              // res.json().data，最新版本直接使用res.json()即可
              console.log('res.json() :', res.json());
              return res.json() as Todo;
            })
            .catch(this.handleError);
  }

  // PUT /todos/:id
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    console.log(url);
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
    // 这里因为只有completed属性发生了改变，如果后台web api是符合REST标准的话可以使用patch，只上传改变的部分
    return this.http
            .put(url, JSON.stringify(updatedTodo), {headers: this.headers})
            .toPromise()
            .then(() => updatedTodo)
            .catch(this.handleError);
  }
  // DELETE /todos/:id
  deleteTodoById(id: string): Promise<void> {
    const url = `${this.api_url}/${id}`;
    return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
  }
  // GET /todos
  getTodos(): Promise<Todo[]>{
    const userId: number = +localStorage.getItem('userId');
    const url = `${this.api_url}/?userId=${userId}`;
    return this.http.get(url)
              .toPromise()
              .then(res => res.json() as Todo[])
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  // GET /todos?completed=true/false
  filterTodos(filter: string): Promise<Todo[]> {
    const userId: number = +localStorage.getItem('userId');
    const url = `${this.api_url}/?userId=${userId}`;
    switch(filter){
      case 'ACTIVE': return this.http
                        .get(`${url}&completed=false`)
                        .toPromise()
                        .then(res => res.json() as Todo[])
                        .catch(this.handleError);
      case 'COMPLETED': return this.http
                          .get(`${url}&completed=true`)
                          .toPromise()
                          .then(res => res.json() as Todo[])
                          .catch(this.handleError);
      default:
        return this.getTodos();
    }
  }
}
