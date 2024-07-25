import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { BaseService } from './base.service';
import { UserForm } from '@interfaces/user.interface';
import { Usuario } from '@models/usuario.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  base_url = this.baseService.base_url;

  public usuario!: Usuario;

  constructor(private baseService: BaseService, private http: HttpClient, private router: Router) {}

  validarToken(): Observable<boolean> {

    return this.http.get(`${this.base_url}/auth/renew`, this.baseService.headers).pipe(
      map((resp: any) => {
        const { email, name, uid } = resp;
        this.usuario = new Usuario(name, email, '', uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError((error) => of(false))
    );
  }

  login( formData: UserForm ) {

    return this.http
      .post(`${this.base_url}/auth`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          return resp;
        })
      )
      .subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/app/dashboard');
        },
        error: (err) => {
          this.baseService.displayErrorMessage( err.error );
        },
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }
}
