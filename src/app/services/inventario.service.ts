import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { PricesService } from './prices.service';
import { BaseService } from './base.service';
import { Inventario, InventarioSignal } from '@interfaces/inventario.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  base_url = this.baseService.base_url

  #inventario = signal<InventarioSignal>({
    loading: true,
    inventario: []
  });

  inventario = computed( () => this.#inventario().inventario );
  loading = computed( () => this.#inventario().loading );

  constructor(
    private http: HttpClient,
    private pricesService: PricesService,
    private baseService: BaseService
  ) {
    this.getInventario();
  }

  getInventario() {
    return this.http.get<Inventario[]>(`${this.base_url}/inventario`, this.baseService.headers )
      .subscribe( (res: any ) => {
        this.#inventario.set({
          loading: false,
          inventario: res.inventario
        })
      });
  }

  postInventario( inventario: Inventario ) {
    return this.http.post(`${this.base_url}/inventario`, inventario, this.baseService.headers)
      .pipe(
        tap(() => {
          this.getInventario();
          this.pricesService.getPrecios()
        })
      )
  }

  putInventario(inventario: Inventario) {
    let id = inventario.id
    return this.http.put(`${this.base_url}/inventario/${id}`, inventario, this.baseService.headers)
      .pipe(
        tap(() => {
          this.getInventario();
          this.pricesService.getPrecios()
        })
      )
  }

  deleteInventario( id: string ){
    return this.http.delete(`${this.base_url}/inventario/${id}`, this.baseService.headers)
      .pipe(
        tap(() => {
          this.getInventario();
          this.pricesService.getPrecios()
        } )
      )
  }

}
