import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private _htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'blue';
  private _errors: ValidationErrors | null = null;

  constructor(private _el: ElementRef<HTMLElement>) {
    console.log(this._el);
    this._htmlElement = this._el;
  }

  @Input()
  public set color(value: string) {
    this._color = value;
    this._setStyle();
  }

  @Input()
  public set errors(value: ValidationErrors | null) {
    this._errors = value;
    this._setErrorMessage();
  }

  ngOnInit(): void {
    this._setStyle();
  }

  private _setStyle(): void {
    if (!this._htmlElement) return;
    this._htmlElement!.nativeElement.style.color = this._color;
  }

  private _setErrorMessage(): void {
    if (!this._htmlElement) return;
    if (!this._errors) {
      this._htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errorKeys = Object.keys(this._errors);
    if (errorKeys.includes('required')) {
      this._htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if (errorKeys.includes('minlength')) {
      console.log(this._errors);
      this._htmlElement.nativeElement.innerText = `Se requieren mínimo ${this._errors['minlength']['requiredLength']} caracteres`;
      return;
    }
    if (errorKeys.includes('email')) {
      this._htmlElement.nativeElement.innerText = 'El valor ingresado no tiene un formato de correo.';
      return;
    }
  }

}
