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

## Nuestra primera señal - Signal

Inicialmente teníamos nuestro arreglo de menú de esta manera:

````typescript
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    { title: 'Contador', route: 'counter', },
    { title: 'Usuario', route: 'user-info', },
    { title: 'Mutaciones', route: 'properties', },
  ];
}
````

Pero ahora, como trabajaremos con señales, convertiremos ese arreglo de menú en una señal. Recordemos la definición de señales que decía **"una señal es un envoltorio alrededor de un valor"**, por lo tanto, envolveremos a nuestro arreglo de menú dentro de la función **signal()** de esa forma estaremos convirtiendo el arreglo de menú en una señal que contiene el arreglo del menú:

````typescript
export class SideMenuComponent {

  public menuItems = signal<MenuItem[]>([
    { title: 'Contador', route: 'counter', },
    { title: 'Usuario', route: 'user-info', },
    { title: 'Mutaciones', route: 'properties', },
  ]);

}
````

Ahora, para poder acceder al valor de nuestra señal usaremos nuestra propiedad **menuItems()** con paréntesis, ya que si solo usamos **menuItems**, sin paréntesis haría referencia a la señal y no a su valor, nos marcaría un error: ``type 'WritableSignal<MenuItem[]>' is not assignable to type 'NgIterable<any> | null | undefined'.``

````html
<ul class="list-group">
  <a *ngFor="let item of menuItems()" [routerLink]="[item.route]" routerLinkActive="active"
    class="list-group-item list-group-item-action">
    {{ item.title }}
  </a>
</ul>
````

## Counter Signal

En la definición de las señales decíamos: **"Las señales pueden ser de escritura o de solo lectura."**, por lo que ahora veremos esos dos tipos de señales:

### Señales de escritura

Las señales de escritura proporcionan una API para actualizar sus valores directamente. Creas señales escribibles llamando a la función **signal()** con el valor inicial de la señal:

````typescript
export class CounterPageComponent {
  public counter = signal(10);
}
````

Las señales son funciones getter: al llamarlas se lee su valor.
````html
<h1>Contador: {{ counter() }}</h1>
````

Para cambiar el valor de una señal de escritura **(WritableSignal)**, puede hacerlo directamente con **.set():**

````html
<button (click)="counter.set(0)" class="btn btn-danger">Reset</button>
````
O utilice la operación **.update()** para calcular un nuevo valor a partir del anterior:

````typescript
export class CounterPageComponent {
  public counter = signal(10);

  increaseBy(value: number) {
    this.counter.update(currentCount => currentCount + value);
  }
}
````

### Señales computadas (calculadas) - De solo lectura

Una señal calculada deriva su valor de otras señales. Defina uno usando **computed()** y especificando una función de derivación:

````typescript
export class CounterPageComponent {
  public counter = signal(10);
  //señal computada de solo lectura
  public squareCounter = computed(() => this.counter() * this.counter());
}
````
**La señal squareCounter depende del counter.** Cada vez que counter se actualiza, **Angular sabe que cualquier cosa que dependa de counter o squareCounter también debe actualizarse.**


Las señales computadas no son señales escribibles. **No puede asignar valores directamente a una señal computada.** Eso es,

````typescript
export class CounterPageComponent {
  public counter = signal(10);
  public squareCounter = computed(() => this.counter() * this.counter()); //<-- Señal computada

  increaseBy(value: number) {
    this.squareCounter.set(3) //<-- No se puede hacer esto en una señal computada
  }
}
````
Como se observa en el código anterior, el **squareCounter** es una señal computada, por lo tanto si queremos usar el **set()** o **update()** **nos marcará un error de compilación**, porque no es una señal de escritura **(WritableSignal)**.
