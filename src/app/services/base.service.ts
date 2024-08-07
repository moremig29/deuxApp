import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';

const env = environment
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  base_url: string = environment.baseUrl;

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  constructor() { }

  displayErrorMessage(err: any) {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.msg,
    });
  }

  displaySuccessMessage(msg: string) {
    Swal.fire('Gooood!', msg, 'success');
  }

}
