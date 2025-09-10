import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, of, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.authService.login({ email: action.email, password: action.password }).pipe(
          map(response => AuthActions.loginSuccess({ user: response.user, token: response.token })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/profile']))
    ),
    { dispatch: false }
  );

  registerCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerCompany),
      exhaustMap(action =>
        this.authService.registerCompany(action.formData).pipe(
          map(response => AuthActions.registerCompanySuccess({ message: response.message })),
          catchError(error => of(AuthActions.registerCompanyFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );
}
