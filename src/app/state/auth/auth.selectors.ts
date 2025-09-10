import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectIsLoggedIn = createSelector(
  selectToken,
  (token) => !!token
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectAuthIsLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);
