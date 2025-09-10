import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth API',
  events: {
    // Login Actions
    'Login': props<{ email: string; password?: string }>(),
    'Login Success': props<{ user: User; token: string }>(),
    'Login Failure': props<{ error: any }>(),

    // Company Registration Actions
    'Register Company': props<{ formData: FormData }>(),
    'Register Company Success': props<{ message: string }>(),
    'Register Company Failure': props<{ error: any }>(),

    // Profile Actions
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ user: User }>(),
    'Load Profile Failure': props<{ error: any }>(),

    // Logout Action
    'Logout': emptyProps(),
  },
});
