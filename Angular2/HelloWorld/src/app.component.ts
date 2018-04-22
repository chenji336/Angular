import {Component, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {validateUserName} from './validate-username';

@Component({
  selector: 'hello-world',
  templateUrl: 'src/app.component.html'
})
export class AppComponent {
	getData(num: number) {
		console.log('num:', num);
		// console.log('event:', event);
	}

	customForm = new FormGroup({
		customName: new FormControl('', validateUserName)
	});

	getCustomForm() {
		console.log(this.customForm);
	}
	
}