import { Injectable, OnInit, computed, signal } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Banco, Estatus, Moneda, TipoDeCuenta, TipoDeTransaccion } from '@interfaces/listas.interface';

@Injectable({
  providedIn: 'root'
})
export class ListasService implements OnInit {

  base_url: string = this.baseService.base_url;

  #estatus = signal<Estatus[]>([]);
  estatus = computed( () => this.#estatus() );
  #tipoTransac = signal<TipoDeTransaccion[]>([]);
  tipoTransac = computed(() => this.#tipoTransac());
  #tipoCuenta = signal<TipoDeCuenta[]>([]);
  tipoCuenta = computed(() => this.#tipoCuenta());
  #tipoCambio = signal<number>(0);
  tipoCambio = computed(() => this.#tipoCambio());
  #monedas = signal<Moneda[]>([]);
  monedas = computed(() => this.#monedas());
  #bancos = signal<Banco[]>([]);
  bancos = computed(() => this.#bancos());

  constructor(private http: HttpClient, private baseService: BaseService) {
    this.getEstatus();
    this.getTipoTransac();
    this.getTipoCuenta();
    this.getTipoCambio();
    this.getMoneda();
    this.getBancos();
  }

  ngOnInit(): void {

  }

  getEstatus(){
    return this.http.get(`${this.base_url}/estatus`, this.baseService.headers)
      .subscribe( ( res: any ) => {
        this.#estatus.set( res.estatus );
      } )
  }

  getTipoTransac() {
    return this.http.get(`${this.base_url}/tipoTransac`, this.baseService.headers )
      .subscribe( (res: any ) => {
        this.#tipoTransac.set( res.TipoTransac )
      })
  }

  getTipoCuenta() {
    return this.http.get(`${this.base_url}/tipoCuenta`, this.baseService.headers )
      .subscribe( (res: any ) => {
        this.#tipoCuenta.set( res.tipoCuenta )
      })
  }

  getTipoCambio() {
    return this.http.get(`${this.base_url}/tipoCambio`, this.baseService.headers )
      .subscribe( (res:any)=> {
        this.#tipoCambio.set( res.tipoCambio.TipoCambio );
      })

  }

  postTipoCambio(tipoCambio: any) {
    return this.http
      .post(`${this.base_url}/tipoCambio`, { TipoCambio: tipoCambio }, this.baseService.headers)
      .pipe(
        map((resp: any) => {
          return resp.tipoCambio.TipoCambio;
        })
      );
  }

  getMoneda(){
    return this.http.get(`${this.base_url}/moneda`, this.baseService.headers )
      .subscribe( (res: any ) => {
        this.#monedas.set( res.moneda )
      })
  }

  getBancos(){
    return this.http.get( `${this.base_url}/banco`, this.baseService.headers )
      .subscribe( (res: any ) => {
        this.#bancos.set( res.bancos );
      })
  }

}
