import { Component, OnInit } from '@angular/core';
import { CarritoModel } from '../../../models/carrito.model';
import { CartService } from '../../../core/services/cart/cart.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  products: CarritoModel[] = [];
  cart: CarritoModel[] = [];
  totalAPagar = 0;
  showMessage = false;
  message = 'Muchas gracias por su compra!';

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.fetchCarrito();
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      this.products = cart;
      this.calcularTotalAPagar();
    });
  }

  calcularTotalAPagar(): void {
    this.totalAPagar = this.products.reduce(
      (total, producto) => total + producto.articulo.precio * producto.cantidad,
      0
    );
  }

  fetchCarrito() {
    this.cartService.getCarrito().subscribe((productos) => {
      this.products = productos;
      this.calcularTotalAPagar();
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

  shopCart(products: any) {
    let x = 0;
    products.forEach((product: CarritoModel) => {
      this.cartService.shopCart(product).subscribe((res) => {});
      x++;
      if (products.length === x) {
        this.emptyCarrito();
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
          this.fetchProducts();
        }, 3000);
      }
    });
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe((res: any) => {
      this.productsService.updateProductList(res);
    });
  }
}
