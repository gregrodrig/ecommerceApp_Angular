import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent {
  title = 'ecommerceStore_Angular';
  name = ['Gregory', 'Greyden', 'Estefany'];

  addName() {
    this.name.push('New name');
  }
  deleteName(index: number) {
    this.name.splice(index, 1);
  }
}
