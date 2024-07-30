import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyService {
  base_url = this.baseService.base_url;
  #loading = signal(true);
  #apikey = signal({
    apikey: '',
    secret: '',
    client: '',
  });

  apikey = computed(() => this.#apikey());
  loading = computed(() => this.#loading());

  constructor(private http: HttpClient, private baseService: BaseService) {}

  postApiKey() {
    this.#loading.set(true);
    return this.http
      .post(`${this.base_url}/apikey`, {}, this.baseService.headers)
      .subscribe((res: any) => {
        this.#loading.set(false)
        this.#apikey.set({
          apikey: res.key.apiKey,
          secret: res.key.secret,
          client: res.key.client,
        });
      });
  }

  getApiKey() {
    return this.http
      .get(`${this.base_url}/apikey`, this.baseService.headers)
      .subscribe((res: any) => {
        this.#loading.set(false)
        this.#apikey.set({
          apikey: res.key.apiKey,
          secret: res.key.secret,
          client: res.key.client,
        });
      });
  }
}
