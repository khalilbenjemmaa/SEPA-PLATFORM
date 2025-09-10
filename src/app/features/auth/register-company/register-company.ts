import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
  ],
  templateUrl: './register-company.html',
  styleUrl: './register-company.scss'
})
export class RegisterCompany {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  registrationForm = this.fb.group({
    companyName: ['', Validators.required],
    siret: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
    vatNumber: ['', Validators.required],
    legalDocuments: [null as File | null, Validators.required],
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.registrationForm.patchValue({ legalDocuments: file });
      this.registrationForm.get('legalDocuments')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.getRawValue();
      const formData = new FormData();

      // Append form fields to FormData
      Object.keys(formValue).forEach(key => {
        const controlValue = formValue[key as keyof typeof formValue];
        if (controlValue) {
          formData.append(key, controlValue);
        }
      });

      this.store.dispatch(AuthActions.registerCompany({ formData }));
    }
  }
}
