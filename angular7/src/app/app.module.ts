import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollDispatchModule} from '@angular/cdk/scrolling'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollDispatchModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
