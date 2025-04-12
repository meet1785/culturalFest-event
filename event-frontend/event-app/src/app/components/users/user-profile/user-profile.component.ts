import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegistrationService } from '../../../services/registration.service';
import { User } from '../../../models/user.model';
import { ActivityRegistration } from '../../../models/activity-registration.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;
  registrations: any[] = []; // In a real app, this would be a proper type
  loading = false;
  error = '';

  constructor(
    public authService: AuthService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    
    if (this.currentUser) {
      this.loadUserRegistrations();
    }
  }

  loadUserRegistrations(): void {
    if (!this.currentUser?.user_id) return;
    
    this.loading = true;
    this.registrationService.getRegistrationsByUserId(this.currentUser.user_id)
      .subscribe({
        next: (registrations) => {
          this.registrations = registrations;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load your registrations. Please try again later.';
          console.error('Error loading registrations:', error);
          this.loading = false;
        }
      });
  }
  
  // In a real app with a backend API that supports it
  cancelRegistration(registrationId: number): void {
    // Example implementation - would need to match your actual API
    /* 
    this.registrationService.cancelRegistration(eventId, activityId, registrationId)
      .subscribe({
        next: () => {
          this.loadUserRegistrations(); // Reload after cancellation
        },
        error: (error) => {
          this.error = 'Failed to cancel registration. Please try again later.';
          console.error('Error canceling registration:', error);
        }
      });
    */
  }
}