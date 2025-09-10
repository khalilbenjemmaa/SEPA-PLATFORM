import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../../core/models/user.model';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: any | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  // Login Reducers
  on(AuthActions.login, (state) => ({ ...state, isLoading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isLoading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Company Registration Reducers
  on(AuthActions.registerCompany, (state) => ({ ...state, isLoading: true, error: null })),
  on(AuthActions.registerCompanySuccess, (state) => ({ ...state, isLoading: false })),
  on(AuthActions.registerCompanyFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Profile Load Reducers
  on(AuthActions.loadProfile, (state) => ({ ...state, isLoading: true, error: null })),
  on(AuthActions.loadProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
  })),
  on(AuthActions.loadProfileFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // Logout Reducer
  on(AuthActions.logout, () => initialState)
);
