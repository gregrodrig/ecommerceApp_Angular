import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../core/services/products/products.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  products: ProductModel[] = [];
  stock: boolean = false;
  agregarStockForm!: FormGroup;
  showMessage = false;
  message = 'No se han podido cargar los productos desde la BD.';

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.agregarStockForm = this.formBuilder.group({
      articulo: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe((product) => {
      this.products = product;
    });
  }

  onSubmit(): void {
    if (this.agregarStockForm.invalid) {
      return;
    }
    const valores = this.agregarStockForm.value;
    this.productsService
      .increadeProduct(valores.articulo, valores.cantidad)
      .subscribe(() => {
        this.agregarStockForm.reset();
        this.stock = true;
        setTimeout(() => {
          this.stock = false;
          this.fetchProducts();
        }, 2000);
      });
  }

  get cantidad() {
    return this.agregarStockForm.get('cantidad');
  }
}
