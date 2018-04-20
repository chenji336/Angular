import {
	Component,
	trigger,
	state,
	style,
	transition,
	animate,
	Output,
	EventEmitter
} from '@angular/core';

@Component({
	selector: 'animation-example',
	styles: [
		`button {
			width: 100px;
			height: 20px;
			background-color: #666;
			font-size: 15px
		}`
	],
	template: `animations
		<div>
			<button [@buttonStatus]="status" (click)="toggleStatus()">
				{{status}}
			</button>
		</div>
	`,
	animations: [
		trigger('buttonStatus', [
			state('on',style({
				color: '#0f2',
				transform: 'scale(1.2)'
			})),
			state('off',style({
				color: '#f00',
				transform: 'scale(1.0)'
			})),
			transition('off => on', animate('100ms ease-in')),
			transition('on => off', animate('100ms ease-in'))
		])
	]
})
export class AnimationComponent {
	@Output() transferData = new EventEmitter<number>();
	status: string = 'on';

	toggleStatus() {
		this.status = this.status === 'on' ? 'off' : 'on';
		this.transferData.emit(100);
	}
}