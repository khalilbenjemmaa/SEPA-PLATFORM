import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../state/auth/auth.selectors';

/**
 * @description A functional route guard that prevents access to routes
 * unless the user is authenticated.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }
      // Redirect to the login page if not authenticated
      return router.createUrlTree(['/login']);
    })
  );
};
