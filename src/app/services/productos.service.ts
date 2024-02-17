import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { BaseService } from './base.service';
import { Producto, ProductoSignal } from '@interfaces/producto.interface';
import { tap } from 'rxjs';
import { InsumosService } from './insumos.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  base_url = this.baseService.base_url;

  #producto = signal<ProductoSignal>({
    productos: [],
    loading: true
  });

  producto: Producto | undefined;

  productos = computed( () => this.#producto().productos );
  loading = computed( () => this.#producto().loading )

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private insumosService: InsumosService
    ) {
  }

  getProductos() {
    return this.http.get(`${this.base_url}/producto`, this.baseService.headers )
      .subscribe( ( res: any ) => {
        this.#producto.set({
          loading: false,
          productos: res.productos
        })
      } )
  }

  postProducto(producto: Producto) {
    return this.http.post(`${this.base_url}/producto`, producto, this.baseService.headers)
      .pipe(
        tap(() => {
          this.getProductos()
          this.insumosService.getInsumos()
        })
      )
  }

  putProducto(producto: Producto) {
    let id = producto.id;
    return this.http.put(`${this.base_url}/producto/${id}`, producto, this.baseService.headers)
      .pipe(
        tap(() => this.getProductos())
      )
  }

  deleteProducto(id: string) {
    return this.http.delete(`${this.base_url}/producto/${id}`, this.baseService.headers)
      .pipe(
        tap( () => this.getProductos() )
      )
  }

}
