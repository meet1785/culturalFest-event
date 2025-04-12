import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  loading = false;
  success = '';
  error = '';
  currentUser: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.profileForm = this.formBuilder.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      college_name: [''],
      phone: ['', Validators.pattern('^[0-9]{10}$')]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    
    if (!this.currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // Pre-populate form with current user data
    this.profileForm.patchValue({
      full_name: this.currentUser.full_name,
      college_name: this.currentUser.college_name || '',
      phone: this.currentUser.phone || ''
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.profileForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;

    if (!this.currentUser) {
      this.error = 'User not found. Please log in again.';
      this.loading = false;
      return;
    }

    const updatedUser: User = {
      ...this.currentUser,
      full_name: this.f['full_name'].value,
      college_name: this.f['college_name'].value,
      phone: this.f['phone'].value
    };

    // In a real application, you would call an API to update the user profile
    // For this demo, we'll use the AuthService method to update the user
    setTimeout(() => {
      this.authService.updateUserProfile(updatedUser);
      this.success = 'Profile updated successfully!';
      this.loading = false;
    }, 1000);
  }
}