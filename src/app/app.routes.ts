// Path: src/app/app.routes.ts

import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: Home, title: 'Welcome to SEPA' },

      // Auth
      { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
      { path: 'register-company', loadComponent: () => import('./features/auth/register-company/register-company').then(m => m.RegisterCompany) },
      { path: 'profile', loadComponent: () => import('./features/profile/profile').then(m => m.Profile), canActivate: [authGuard] },

      // Products & Cart
      { path: 'products', loadComponent: () => import('./features/products/product-list/product-list').then(m => m.ProductList) },
      { path: 'products/:id', loadComponent: () => import('./features/products/product-detail/product-detail').then(m => m.ProductDetail) },
      { path: 'cart', loadComponent: () => import('./features/cart/cart').then(m => m.Cart) },

      // --- NEWLY ADDED CHECKOUT AND ORDER ROUTES ---
      { path: 'checkout', loadComponent: () => import('./features/payments/checkout/checkout').then(m => m.Checkout), canActivate: [authGuard] },
      { path: 'orders', loadComponent: () => import('./features/orders/order-list/order-list').then(m => m.OrderListComponent), canActivate: [authGuard] },
      { path: 'orders/:id', loadComponent: () => import('./features/orders/order-detail/order-detail').then(m => m.OrderDetailComponent), canActivate: [authGuard] },
    ]
  },
  { path: '**', redirectTo: '' }
];

