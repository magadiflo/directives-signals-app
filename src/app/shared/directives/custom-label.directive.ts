import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private _htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'blue';

  constructor(private _el: ElementRef<HTMLElement>) {
    console.log(this._el);
    this._htmlElement = this._el;
  }

  @Input()
  public set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    if (!this._htmlElement) return;
    this._htmlElement!.nativeElement.style.color = this._color;
  }

}
