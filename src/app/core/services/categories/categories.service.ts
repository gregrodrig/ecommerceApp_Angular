import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryModel } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<CategoryModel[]>(`${environment.URL_API}Categoria`);
  }

  getCategory(id: number) {
    return this.http.get<CategoryModel>(`${environment.URL_API}${id}`);
  }

  createCategory(category: CategoryModel) {
    return this.http.post(`${environment.URL_API}Categoria`, category);
  }

  updateCategory(id: number, changes: Partial<CategoryModel>) {
    return this.http.put(`${environment.URL_API}Categoria/${id}`, changes);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.URL_API}${id}`);
  }
}
