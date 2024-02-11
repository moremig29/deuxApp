import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { BaseService } from './base.service';
import { Insumo } from '../interfaces/insumo.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  base_url = this.baseService.base_url;

  #insumos = signal({
    loading: true,
    insumos: []
  })

  loading = computed( () => this.#insumos().loading )
  insumos = computed( () => this.#insumos().insumos )

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) {
    this.getInsumos();
  }

  getInsumos(){
    return this.http.get(`${this.base_url}/insumo`, this.baseService.headers)
      .subscribe( (res: any ) => {
        this.#insumos.set({
          loading: false,
          insumos: res.data
        })
      } )
  }

  postInsumo( insumo: Insumo ) {
    return this.http.post( `${this.base_url}/insumo`, insumo, this.baseService.headers )
      .pipe(
        tap( () => this.getInsumos() )
      )
  }

  putInsumo(insumo: Insumo) {
    let id = insumo.id;
    return this.http.put(`${this.base_url}/insumo/${id}`, insumo, this.baseService.headers)
      .pipe(
        tap(() => this.getInsumos())
      )
  }

  deleteInsumo(id: string ) {
    return this.http.delete(`${this.base_url}/insumo/${id}`, this.baseService.headers)
      .pipe(
        tap(() => this.getInsumos())
      )
  }

}
