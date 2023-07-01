import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'; //ANADE PRINCIPIOS REACTIVOS A NUESTRA APP@ANGULAR.
import { CarritoModel } from './../../../models/carrito.model';
import { ProductModel } from './../../../models/product.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: ProductModel[] = [];
  private cart = new BehaviorSubject<ProductModel[]>([]); //PARA TENER ENTRADA DE CONTROL DE DATOS DE PRODUCTOS. --- EL CARRITO INICIALIZA EN CERO (0)

  cart$ = this.cart.asObservable(); //VARIABLE PUBLICA PARA PODER SER PREGUNTADA POR CUALQUIER COMPONENTE Y NOTAR LOS CAMBIOS EN TIEMPO REAL....

  constructor(private http: HttpClient) {}

  addCart(product: ProductModel) {
    (this.products = [...this.products, product]), //CREAR UNA NUEVA REFERENCIA DEL ARREGLO PARA EVITAR INMUTIBILIDAD
      this.cart.next(this.products); //NOTIFICAR A TODOS LOS COMPONENTES QUE ESTEN SUSCRITOS QUE ALGO SE AGREGO AL CARRITO, QUE HUBO UN CAMBIO...
  }

  getCarrito() {
    return this.http.get<CarritoModel[]>(`${environment.URL_API}Carrito`);
  }

  // getAllProducts() {
  //   return this.http.get<ProductModel[]>(`${environment.URL_API}Articulo`);
  // }

  // createProduct(product: ProductModel) {
  //   return this.http.post(`${environment.URL_API}Articulo`, product);
  // }

  // updateProduct(id: number, changes: Partial<ProductModel>) {
  //   return this.http.put(`${environment.URL_API}Articulo/${id}`, changes);
  // }

  // deleteProduct(id: number) {
  //   return this.http.delete(`${environment.URL_API}${id}`);
  // }
}
