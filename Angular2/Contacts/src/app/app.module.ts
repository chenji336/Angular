// app.module.ts
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from '@angular/http';

import {AppComponent} from "./app.component";
import {rootRouterConfig} from './app.routes';

import {CollectionComponent} from './collection';
import {ListComponent, ListItemComponent} from './list';
import {DetailComponent} from './detail';
import {EditComponent} from './edit';
import {UtilService, ContactService, FooterComponent, HeaderComponent, PhonePipe, BtnClickDirective} from './shared';

@NgModule({
  declarations: [
  	AppComponent,
  	CollectionComponent,
  	ListComponent, ListItemComponent,
  	DetailComponent,
  	EditComponent,
  	FooterComponent, HeaderComponent, PhonePipe, BtnClickDirective
  ],
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  // imports: [BrowserModule, FormsModule, HttpModule],
  providers: [UtilService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
