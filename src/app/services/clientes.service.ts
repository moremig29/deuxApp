import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { BaseService } from './base.service';
import { tap } from 'rxjs';
import { Cliente, ClienteSignal } from '@interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  base_url = this.baseService.base_url

  #clientes = signal<ClienteSignal>({
    loading: true,
    clientes: []
  })

  loading = computed( () => this.#clientes().loading )
  clientes = computed( () => this.#clientes().clientes )

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) {
    this.getClientes();
  }

  getClientes(){
    return this.http.get(`${this.base_url}/cliente`, this.baseService.headers)
      .subscribe( ( res: any ) => {
        this.#clientes.set({
          loading: false,
          clientes: res.cliente
        })
      })
  }

  postCliente(cliente: Cliente) {
    return this.http.post(`${this.base_url}/cliente`, cliente, this.baseService.headers)
      .pipe(
        tap( () => this.getClientes() )
      )
  }

  putCliente(cliente: Cliente) {
    let id = cliente.id;
    return this.http.put(
      `${this.base_url}/cliente/${id}`,
      cliente,
      this.baseService.headers )
      .pipe(
        tap(() => this.getClientes())
      )

  }

  deleteCliente(id: string) {
    return this.http.delete(`${this.base_url}/cliente/${id}`, this.baseService.headers)
      .pipe(
        tap(() => this.getClientes())
      )
  }

}
