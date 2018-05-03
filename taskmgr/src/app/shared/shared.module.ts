import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
  ],
  declarations: []
})
// 共享模块如果是简单的就一两个就没有必要写了，一般是包含多个组件、服务，大家都需要引用
export class SharedModule { }
