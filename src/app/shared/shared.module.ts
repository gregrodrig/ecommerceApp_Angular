import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CategoriesMenuComponent } from './components/categories-menu/categories-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CarritoComponent,
    CategoriesMenuComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CarritoComponent,
    CategoriesMenuComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
