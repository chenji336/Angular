import {Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'hello-world',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
	getData(num: number) {
		console.log('num:', num);
		// console.log('event:', event);
	}
}