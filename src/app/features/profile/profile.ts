// Path: src/app/features/profile/profile.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/auth/auth.selectors';
import { AuthActions } from '../../state/auth/auth.actions';
import { filter, take } from 'rxjs';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatDividerModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  user$ = this.store.select(selectUser);
  profileForm: FormGroup;

  constructor() {
    this.profileForm = this.fb.group({
      profileData: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: [''],
        deliveryAddress: this.fb.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          zipCode: ['', Validators.required],
          country: ['', Validators.required],
        }),
      }),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadProfile());

    this.user$.pipe(
      filter((user): user is User => !!user), // Type guard to ensure user is not null
      take(1)
    ).subscribe(user => {
      this.profileForm.patchValue({
        profileData: {
          firstName: user.profileData?.firstName || '',
          lastName: user.profileData?.lastName || '',
          phone: user.profileData?.phone || '',
          deliveryAddress: {
            street: user.profileData?.deliveryAddress?.street || '',
            city: user.profileData?.deliveryAddress?.city || '',
            zipCode: user.profileData?.deliveryAddress?.zipCode || '',
            country: user.profileData?.deliveryAddress?.country || '',
          }
        }
      });
    });
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      const updatedProfileData = this.profileForm.get('profileData')?.value;
      // Dispatch an update action with the corrected payload structure
      // this.store.dispatch(AuthActions.updateProfile({ profileData: updatedProfileData }));
      console.log('Updating profile with:', updatedProfileData);
    }
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

