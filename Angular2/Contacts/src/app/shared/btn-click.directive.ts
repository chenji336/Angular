import {Directive, ElementRef, Input, Renderer} from "@angular/core";

const ClickingBackColor = '#eee';

@Directive({
  selector: "[btnClickStyle]",
  host: {
    "(click)": "doClick()"
  }
})
export class BtnClickDirective {

}