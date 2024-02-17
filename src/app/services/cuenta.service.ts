import { Injectable, computed, signal } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Saldo } from '@interfaces/saldo.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuentaService {
  base_url = this.baseService.base_url;

  #cuentas = signal({
    loading: true,
    cuentas: [],
  });

  #cuentasByType = signal<Saldo>({
  bolEfectivo: 0,
  bolbanco:    0,
  dolEfectivo: 0,
  dolBanco:    0,
})
  cuentasByType = computed( () => this.#cuentasByType() );
  cuenta: any | undefined

  loading = computed(() => this.#cuentas().loading);
  cuentas = computed(() => this.#cuentas().cuentas);

  constructor(private baseService: BaseService, private http: HttpClient) {}

  getCuentas() {
    return this.http
      .get(`${this.base_url}/cuenta`, this.baseService.headers)
      .subscribe((res: any) => {
        this.#cuentas.set({
          loading: false,
          cuentas: res.cuenta,
        });
      });
  }

  postCuenta(cuenta: any) {
    return this.http.post(
      `${this.base_url}/cuenta`,
      cuenta,
      this.baseService.headers
    ). pipe(
      tap( () => {
        this.getCuentas();
        this.getCuentasByType();
      }
    ))
  }

  getCuentasByType() {
    return this.http
      .get(`${this.base_url}/cuenta/cuentaByType`, this.baseService.headers)
      .subscribe((res: any) => {
        this.#cuentasByType.set(res.saldos);
      });
  }

  putCuenta(id: string, cuenta: any) {
    return this.http
      .put(`${this.base_url}/cuenta/${id}`, cuenta, this.baseService.headers)
      .pipe(tap( () => {
        this.getCuentas()
        this.getCuentasByType()
      } ))
  }

  deleteCuenta(id: string ) {
    return this.http
      .delete(`${this.base_url}/cuenta/${id}`, this.baseService.headers)
      .pipe(tap(() => {
        this.getCuentas();
        this.getCuentasByType();
      }));
  }
}
