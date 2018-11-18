import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular7';
  items = Array.from({length: 100}).map((_, i) => `Item #${i}`);
}
