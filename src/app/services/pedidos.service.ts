import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { BaseService } from './base.service';
import { tap } from 'rxjs';
import { PedidoSignal } from '@interfaces/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  base_url = this.baseService.base_url

  pedido: any;

  #pedidos = signal<PedidoSignal>({
    loading: true,
    pedidos: []
  })

  loading = computed( () => this.#pedidos().loading )
  pedidos = computed( () => this.#pedidos().pedidos )

  constructor(
    private http: HttpClient,
    private baseService: BaseService
    ) {
    this.getPedidos();
  }

  getPedidos(){
    return this.http.get(`${this.base_url}/pedido`, this.baseService.headers )
      .subscribe( ( res: any ) => {
        this.#pedidos.set({
          loading: false,
          pedidos: res.pedidos
        })
      })
  }

  postPedido( pedido: any ){
    return this.http.post(`${this.base_url}/pedido`, pedido, this.baseService.headers)
      .pipe(
        tap( () => this.getPedidos() )
      )
  }

  putPedido( pedido: any, id: string ){
    return this.http.put(
      `${this.base_url}/pedido/${id}`, pedido,
      this.baseService.headers
    ).pipe(
      tap( () => this.getPedidos())
    )
  }

  deletePedido( id: string ) {
    return this.http.delete(`${this.base_url}/pedido/${id}`, this.baseService.headers )
      .pipe(
        tap(() => this.getPedidos() )
      )
  }

}
