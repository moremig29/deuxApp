import { Injectable, computed, signal } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  base_url = this.baseService.base_url;

  #cuentas = signal({
    loading: true,
    cuentas: []
  });

  loading = computed( () => this.#cuentas().loading);
  cuentas = computed( () => this.#cuentas().cuentas);

  constructor( private baseService: BaseService, private http: HttpClient ) { }


  getCuentas(){

    return this.http.get(`${this.base_url}/cuenta`, this.baseService.headers )
      .subscribe( (res: any ) => {
        this.#cuentas.set({
          loading: true,
          cuentas: res.cuenta
        })
      })
  }

  postCuenta(cuenta: any) {
    return this.http.post(`${this.base_url}/cuenta`, cuenta, this.baseService.headers);
  }

}
