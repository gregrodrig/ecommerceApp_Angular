import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() producto!: ProductModel;
  @Output() productoClicado: EventEmitter<any> = new EventEmitter();
  zoom: boolean = false;

  constructor(private cartService: CartService) {}

  togleHover() {
    this.zoom = !this.zoom;
  }

  agregarCarrito() {
    this.cartService.addCart(this.producto.id).subscribe(
      () => {
        console.log('Anadido el producto al carrito');
      },
      (error) => {
        console.error('Error al agregar el producto al carrito', error);
      }
    );
  }
}
