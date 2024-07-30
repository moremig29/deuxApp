import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  base_url = this.baseService.base_url;

  #messages = signal({
    loading: false,
    messages: [],
  });

  messages = computed(() => this.#messages().messages);
  loading = computed(() => this.#messages().loading);

  constructor(private http: HttpClient, private baseService: BaseService) {}

  getMessages() {
    return this.http
      .get(`${this.base_url}/mensaje`, this.baseService.headers)
      .subscribe((res: any) => {
        this.#messages.set({
          loading: false,
          messages: res.mensajes,
        });
      });
  }
}
