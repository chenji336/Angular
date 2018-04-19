// app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AnimationComponent} from "./animation.component";

@NgModule({
  declarations: [AppComponent,AnimationComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
