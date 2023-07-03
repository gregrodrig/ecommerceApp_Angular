import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../../../models/product.model';
import { environment } from './../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products$ = new BehaviorSubject<ProductModel[]>([]);

  constructor(private http: HttpClient) {}

  checkProducts(): Observable<ProductModel[]> {
    return this.products$.asObservable();
  }

  updateProductList(product: ProductModel[]) {
    this.products$.next(product);
  }

  getProductsByCategory(category: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      `${environment.URL_API}Articulo?categoria=${category}`
    );
  }

  getAllProducts() {
    return this.http.get<ProductModel[]>(`${environment.URL_API}Articulo`);
  }

  getProduct(id: number) {
    return this.http.get<ProductModel>(`${environment.URL_API}${id}`);
  }

  createProduct(product: ProductModel) {
    return this.http.post(`${environment.URL_API}Articulo`, product);
  }

  updateProduct(id: number, changes: Partial<ProductModel>) {
    return this.http.put(`${environment.URL_API}Articulo/${id}`, changes);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.URL_API}${id}`);
  }
}
