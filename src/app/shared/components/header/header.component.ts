import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  home: boolean = false;

  goBack() {
    this.home = false;
    history.back();
  }
}
