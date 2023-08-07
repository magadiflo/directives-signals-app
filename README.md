# Sección: Directivas personalizadas de Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.7.

---

## Formulario Reativo Tradicional

Normalmente cuando hacíamos la **Inyección de Dependencia** de alguna clase que usemos en nuestro componente
lo hacíamos de la siguiente manera:

````typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent {
  constructor(private _fb: FormBuilder) {}
}
````

En pocas palabras, **usámos el constructor para hace la inyección de dependencia.** Ahora, existe otra forma de 
podere realizar la misma **inyección de dependencia**, veamos cómo: 


````typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent {

  private _fb = inject(FormBuilder);

  public myForm: FormGroup = this._fb.nonNullable.group({
    name: [''],
  });

}
````

Como se observa, esa otra forma es usando la función ``inject()``. Ambas formas, tanto usando el **constructor como usando el inject() son válidas.**


