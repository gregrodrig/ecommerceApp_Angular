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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchCarrito();
  }

  fetchCarrito() {
    this.cartService.getCarrito().subscribe((productos) => {
      this.products = productos;
    });
  }
}
