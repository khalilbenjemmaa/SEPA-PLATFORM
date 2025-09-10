// Path: src/app/layout/header/header.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider'; // <-- FIX: Import MatDividerModule

// App services and state
import { CartService } from '../../core/services/cart.service';
import { selectIsLoggedIn, selectUser } from '../../state/auth/auth.selectors';
import { AuthActions } from '../../state/auth/auth.actions';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule // <-- FIX: Add MatDividerModule to imports
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  private store = inject(Store);
  private cartService = inject(CartService);

  public cartItemCount = this.cartService.totalItems;
  public isLoggedIn$ = this.store.select(selectIsLoggedIn);
  public user$ = this.store.select(selectUser);

  public userInitials$ = this.user$.pipe(
    map(user => this.getInitials(user))
  );

  private getInitials(user: User | null): string {
    if (!user?.profileData) return '';
    const firstName = user.profileData.firstName || '';
    const lastName = user.profileData.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

