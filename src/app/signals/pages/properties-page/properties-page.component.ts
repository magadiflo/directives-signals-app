import { Component } from '@angular/core';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styles: [
  ]
})
export class PropertiesPageComponent {

  onFieldUpdated(field: string, value: string): void {
    console.log({ field, value });
  }

}
