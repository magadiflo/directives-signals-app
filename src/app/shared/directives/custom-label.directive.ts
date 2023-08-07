import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private _htmlElement?: ElementRef<HTMLElement>;

  constructor(private _el: ElementRef<HTMLElement>) {
    console.log(this._el);
    this._htmlElement = this._el;

    this._htmlElement.nativeElement.innerHTML = 'Hola Mundo!';
  }

  ngOnInit(): void {
    console.log('ngOnInit - customLabel');
  }

}
