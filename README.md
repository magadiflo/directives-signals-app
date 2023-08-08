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


# Sección: Signals en Angular - Angular 16+

## ¿Qué es un Signals?

Una señal es un espacio en memoria que sabe dónde se está usando. Las señales le dicen a Angular dónde exactamanente **tal elemento** está siendo utilizada. Podríamos verlo como una forma simplificada de un tipo de programación reactiva.

**Angular Signals** es un sistema que rastrea granularmente cómo y dónde se usa su estado en una aplicación, lo que permite que el marco optimice Renderizando actualizaciones.


> **Una señal es un envoltorio alrededor de un valor** que puede notificar a los consumidores interesados **cuando cambia ese valor**. Las señales pueden contener cualquier valor, desde primitivas simples hasta estructuras de datos complejas.
> El valor de una señal siempre se lee a través de una función getter, que permite a Angular rastrear dónde se usa la señal.
> Las señales pueden ser de escritura o de solo lectura.

Los Signals nos pueden ayudar a evitar todas esas comprobaciones innecesarias y simplemente actualizar la parte de la aplicación que ha cambiado, a esto se le conoce como reactividad de grano fino. Esto aumenta enormemente el rendimiento de la aplicación y permite una mayor velocidad de actualización en la interfaz de usuario.
