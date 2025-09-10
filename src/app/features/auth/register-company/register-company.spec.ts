import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './register-company.html',
  styleUrl: './register-company.scss'
})
export class RegisterCompany {
  // Declare the form property here.
  registrationForm: FormGroup;

  // Initialize the form inside the constructor where `fb` is available.
  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      companyName: ['', Validators.required],
      siret: ['', [Validators.required, Validators.pattern('^[0-9]{14}$')]],
      vatNumber: ['', Validators.required],
      legalDocuments: [null, Validators.required],
    });
  }

  // Add the missing onFileSelected method.
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.registrationForm.patchValue({
        legalDocuments: file
      });
      this.registrationForm.get('legalDocuments')?.markAsTouched();
    }
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    console.log('Form Submitted!', this.registrationForm.value);
  }
}

