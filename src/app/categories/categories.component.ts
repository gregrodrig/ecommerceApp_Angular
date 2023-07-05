import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoryModel } from '../models/category.model';
import { CategoriesService } from '../core/services/categories/categories.service';
import { TitleCategoryService } from '../core/services/titleCategory/title-category.service';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @Output() categoriaSeleccionada = new EventEmitter<string>();
  products: ProductModel[] = [];
  categoria: CategoryModel[] = [];
  filter: string = '';

  constructor(
    private categoryService: CategoriesService,
    private titleCategoryService: TitleCategoryService
  ) {}

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((category) => {
      this.categoria = category;
    });
  }

  selectedCategory(nombre: string) {
    if (nombre !== this.filter) {
      this.filter = nombre;
      this.categoriaSeleccionada.emit(nombre);
    }

    if (nombre === '') {
      this.titleCategoryService.setTitle('Todos los productos');
    } else {
      this.titleCategoryService.setTitle(nombre);
    }
  }
}
