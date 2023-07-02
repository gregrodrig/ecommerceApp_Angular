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
  cart: CarritoModel[] = [];
  totalAPagar = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchCarrito();
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.products = cart;
    });
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

  deleteProductCart(idProducto: number) {
    this.cartService.deleteProductCart(idProducto).subscribe(() => {
      this.fetchCarrito();
    });
  }

  shopCart() {
    this.cartService.shopCart();
    this.emptyCarrito();
    this.ngOnInit();
  }
}
