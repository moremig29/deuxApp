import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validarToken()
    .pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          router.navigateByUrl('/auth');
        }
      })
    )
};
