import { Component, OnInit } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  animations: [
    trigger('toggleDiv', [
        state('show', style({
          height: '*',
          // display: 'blcok'
        })),
        state('hide',style({
          height: 0,
          // display: 'none'
        })),
        transition('show => hide',animate('1000ms ease-in')),
        transition('hide => show',animate('1000ms ease-out'))
      ]),
      trigger('shrinkOut', [
        state('in', style({height: '*'})),
        transition('* => void', [
          style({height: '100px'}),
          animate(250, style({height: 0}))
        ])
      ])
  ]
})
export class PlaygroundComponent implements OnInit {
  // 正常这样，显示是object。不过通过管道async就可以解决这个问题（否则就需要像下面这样编写）
   clock = interval(1000);
  // clock: number;

  state: string = 'show';
  state2: string = 'in';
  constructor() { 
    // 每隔1s执行一下subscribe里面内容
    // interval(1000).pipe(map(value => {console.log('observable created');return value})).subscribe(value => this.clock = value)
  }

  ngOnInit() {
    // fromEvent()
  }
  toggle() {
    this.state = this.state === 'show' ? 'hide' : 'show';
    this.state2 = this.state2 === 'in' ? 'pp' : 'in';
  }

}
