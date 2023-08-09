import { Component, effect, signal } from '@angular/core';

import { User } from '../../interfaes/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styles: [
  ]
})
export class PropertiesPageComponent {

  public counter = signal(10);
  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public userChangeEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  onFieldUpdated(field: keyof User, value: string): void {
    this.user.mutate(current => {
      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }
    });
  }

  increaseBy(value: number): void {
    this.counter.update(current => current + value);
  }

}
