import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MdToolbarModule} from '@angular/material'

// 核心模块只加载一次的，比如一些公共加载的组件和模块
@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports: [HeaderComponent, FooterComponent, SidebarComponent]
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
