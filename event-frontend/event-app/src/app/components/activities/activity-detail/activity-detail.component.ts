import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';
import { VenueService } from '../../../services/venue.service';
import { AuthService } from '../../../services/auth.service';
import { Activity } from '../../../models/activity.model';
import { Venue } from '../../../models/venue.model';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-detail.component.html',
  styleUrl: './activity-detail.component.scss'
})
export class ActivityDetailComponent implements OnInit {
  activity: Activity | null = null;
  venue: Venue | null = null;
  loading = true;
  error = '';
  eventId: number = 0;
  activityId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private venueService: VenueService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id) {
          this.error = 'Invalid activity ID';
          return of(null);
        }
        this.activityId = id;
        // In a real app, we would have an API to get activity by ID directly
        // For now, we'll assume we're working with the first event
        this.eventId = 1; // This would be determined based on the actual route or API
        
        return this.activityService.getActivityById(this.eventId, this.activityId);
      }),
      switchMap(activity => {
        if (!activity) return of(null);
        
        this.activity = activity;
        return forkJoin({
          venue: this.venueService.getVenueById(activity.venue_id)
        });
      })
    ).subscribe({
      next: (result) => {
        if (result) {
          this.venue = result.venue;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load activity details. Please try again later.';
        console.error('Error loading activity details:', error);
        this.loading = false;
      }
    });
  }

  registerForActivity(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/activities', this.activityId, 'register']);
    } else {
      this.router.navigate(['/auth/login'], { 
        queryParams: { returnUrl: `/activities/${this.activityId}/register` } 
      });
    }
  }
}