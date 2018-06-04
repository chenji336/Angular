import {
	Component,
	OnInit,
	trigger,
	state,
	style,
	transition,
	animate,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

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
		<div  [ngStyle]="{tt:objtt.background}">
			<button [@buttonStatus]="status" (click)="toggleStatus()">
				{{status}}---{{animationStyle}}
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
export class AnimationComponent implements OnInit {
	@Input() animationStyle: string;
	@Output() transferData = new EventEmitter<number>();
	status: string = 'on';
	test: SafeStyle
	// 如果要使用合法类型就使用[style]='test'
	objtt = {background:'red'}
	tt="'background'"
	constructor(private sanitizer : DomSanitizer){

	}
	
	ngOnInit() {
		console.log(this.animationStyle);
		this.test=this.sanitizer.bypassSecurityTrustStyle(this.animationStyle);
	}

	toggleStatus() {
		this.status = this.status === 'on' ? 'off' : 'on';
		this.transferData.emit(100);
	}
}