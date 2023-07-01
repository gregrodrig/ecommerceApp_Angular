import { Component, OnInit } from '@angular/core';
import { CarritoModel } from '../../../models/carrito.model';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  products: CarritoModel[] = [];
  totalAPagar = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchCarrito();
  }

  fetchCarrito() {
    this.cartService.getCarrito().subscribe((productos) => {
      this.products = productos;
    });
  }
  emptyCarrito() {
    this.cartService.emptyCart().subscribe(() => {
      this.products = [];
      console.log('Carrito vacio');
    });
  }

  deleteProductCart(id: number) {
    this.cartService.deleteProductCart(id).subscribe(() => {
      this.fetchCarrito();
    });
  }

  shopCart() {
    this.cartService.shopCart().subscribe(() => {
      this.emptyCarrito();
      console.log('Compra realizada');
    });
  }
}
