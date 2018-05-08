import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CoreModule} from './core/core.module';
// import {CoreModule} from './core'; // 如果core文件夹下面是index.ts的话，则可以书写
import { AppComponent } from './app.component';
import {MdSidenavModule} from '@angular/material'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    MdSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
