import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {
  inputValue: string = '';
  @Input() placeholder: string = 'What needs to be done?'; // 默认值
  @Input() delay: number = 300;

  //detect the input value and output this to parent
  @Output() textChanges = new EventEmitter<string>();
  //detect the enter keyup event and output this to parent
  @Output() onEnterUp = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) { // 代表todo-header组件
    const event$ = fromEvent(elementRef.nativeElement, 'keyup') // 通过添加事件生成Observable
      .pipe(map(() => this.inputValue)) // rxjs6 通过pipe进行operators连接
      .pipe(debounceTime(this.delay))
      .pipe(distinctUntilChanged());
    event$.subscribe(input => { // 进行监听keyup事件，每次运行前会执行上面的operators
      this.textChanges.emit(input)
    });
  }
  ngOnInit() {
  }
  enterUp(){
    // 防止快速输入之后点击enter（上面有debounceTime，导致input.value传入过去是空）
    this.onEnterUp.emit(this.inputValue);
    this.inputValue = '';
  }
}