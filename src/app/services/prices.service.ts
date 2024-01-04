import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { BaseService } from './base.service';
import { Precio } from '@interfaces/precio.interface';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  base_url = this.baseService.base_url;

  #prices = signal({
    loading: true,
    prices: []
  });
  prices = computed( () => this.#prices().prices );
  loading = computed( () => this.#prices().loading );

  _precios: any;
  get precios() {
    return this._precios;
  }

  constructor(private http: HttpClient, private baseService: BaseService ) {
    this.getPrecios();
  }

  getPrecios() {
    return this.http.get<Precio>(`${this.base_url}/precio`, this.baseService.headers )
      .subscribe( (res: any) => {
        this.#prices.set({
          loading: false,
          prices: res.precios
        });
        this._precios = res.precios;
      })
  }

}
