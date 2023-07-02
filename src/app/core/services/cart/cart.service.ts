import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs'; //ANADE PRINCIPIOS REACTIVOS A NUESTRA APP@ANGULAR.
import { CarritoModel } from './../../../models/carrito.model';
import { ProductModel } from './../../../models/product.model';
import { environment } from './../../../../environments/environment';
import { tap, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: any[] = [];
  private cart: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    this.products
  ); //PARA TENER ENTRADA DE CONTROL DE DATOS DE PRODUCTOS. --- EL CARRITO INICIALIZA EN CERO (0)

  cart$ = this.cart.asObservable(); //VARIABLE PUBLICA PARA PODER SER PREGUNTADA POR CUALQUIER COMPONENTE Y NOTAR LOS CAMBIOS EN TIEMPO REAL....

  constructor(private http: HttpClient) {}

  addCart(idProducto: number) {
    const data: CarritoModel = {
      id: 0,
      articuloId: idProducto,
      articulo: {
        id: idProducto,
        nombre: 'string',
        cantidad: 0,
        precio: 0,
        imagen: 'string',
        descripcion: 'string',
        categoriaId: 0,
        categoria: {
          id: 0,
          nombre: 'string',
        },
      },
      cantidad: 0,
    };
    return this.http.post(`${environment.URL_API}Carrito`, data).pipe(
      switchMap(() => this.getCarrito()),
      tap((cart) => {
        this.cart.next(cart);
      })
    );
  }

  getCarrito() {
    return this.http.get<CarritoModel[]>(`${environment.URL_API}Carrito`);
  }
  emptyCart() {
    return this.http
      .delete(`${environment.URL_API}Carrito/eliminarCarritoTodo/`)
      .pipe(
        switchMap(() => this.getCarrito()), // Obtener el carrito actualizado
        tap((cart) => {
          this.cart.next(cart);
          this.products = []; // Actualizar la variable 'products'
        })
      );
  }

  shopCart() {
    const requests = this.cart.value.map((producto) => {
      return this.http.put(
        `Articulo/${producto.articuloId}/decrementar-cantidad/${producto.cantidad}`,
        null
      );
    });
    console.log(requests);
    forkJoin(requests).pipe(
      map(() => {
        this.emptyCart();
      })
    );

    // .subscribe(() => this.cart.next([]));
    // console.log('soy el shopCart del archivo cart.service.ts');
    // const requests = this.cart.value.map((producto) => {
    //   return this.http.put(
    //     `Articulo/${producto.articuloId}/decrementar-cantidad/${producto.cantidad}`,
    //     null
    //   );
    // });
    // return forkJoin(requests).pipe(
    //   switchMap(() => this.emptyCart()), // Vaciar el carrito después de decrementar la cantidad
    //   tap(() => {
    //     this.cart.next([]); // Vaciar el BehaviorSubject 'cart'
    //     this.products = []; // Vaciar el arreglo de productos
    //   })
    // );
  }

  deleteProductCart(idProducto: number) {
    return this.http.delete(
      `${environment.URL_API}Carrito/eliminarCarrito/${idProducto}`
    );
  }
}
