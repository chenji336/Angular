import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule {
  // Optional：第一次查找的时候，如果不存在，不需要报错
  // SkipSelf： 不要找自己，否则会无限循环下去（去找父模块）
  constructor(@Optional() @SkipSelf() parent: CoreModule) { 
    if (parent) {
      throw new Error('模块已存在，不需要再次加载！！');
    }
  }
 }
