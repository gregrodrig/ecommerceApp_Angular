import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductsService } from './../core/services/products/products.service';
import { TitleCategoryService } from '../core/services/titleCategory/title-category.service';
import { CartService } from '../core/services/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductModel[] = [];
  categoriaSeleccionada: string = 'Todos los productos';

  constructor(
    private productsService: ProductsService,
    private titleCategoryService: TitleCategoryService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.fetchProducts();
    this.titleCategoryService.title$.subscribe((title) => {
      this.categoriaSeleccionada = title;
      this.filterProductsByCategory();
    });
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  clickProduct(producto: ProductModel) {
    this.cartService.addCart(producto);
  }

  filterProductsByCategory() {
    if (this.categoriaSeleccionada === 'Todos los productos') {
      return this.fetchProducts();
    }
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products.filter(
        (producto) => producto.categoria.nombre === this.categoriaSeleccionada
      );
    });
  }
}
