import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VenueService } from '../../../services/venue.service';
import { EventService } from '../../../services/event.service';
import { Venue } from '../../../models/venue.model';
import { Activity } from '../../../models/activity.model';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-venue-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './venue-detail.component.html',
  styleUrl: './venue-detail.component.scss'
})
export class VenueDetailComponent implements OnInit {
  venue: Venue | null = null;
  activities: Activity[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private venueService: VenueService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id) {
          this.error = 'Invalid venue ID';
          return of(null);
        }
        
        return forkJoin({
          venue: this.venueService.getVenueById(id).pipe(
            catchError(error => {
              console.error('Error fetching venue:', error);
              this.error = 'Failed to load venue details.';
              return of(null);
            })
          ),
          activities: this.venueService.getVenueActivities(id).pipe(
            catchError(error => {
              console.error('Error fetching venue activities:', error);
              return of([]);
            })
          )
        });
      })
    ).subscribe({
      next: (result) => {
        if (result?.venue) {
          this.venue = result.venue;
          this.activities = result.activities;
          
          // Enrich activities with event names if needed
          if (this.activities.length > 0) {
            const uniqueEventIds = [...new Set(this.activities.map(a => a.event_id))];
            if (uniqueEventIds.length > 0) {
              this.loadEventDetails(uniqueEventIds);
            }
          }
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load venue details. Please try again later.';
        console.error('Error loading venue details:', error);
        this.loading = false;
      }
    });
  }

  private loadEventDetails(eventIds: number[]): void {
    // Load event details for each activity to display the event name
    for (const eventId of eventIds) {
      this.eventService.getEventById(eventId).pipe(
        catchError(error => {
          console.error(`Error fetching event ${eventId}:`, error);
          return of(null);
        })
      ).subscribe(event => {
        if (event) {
          this.activities = this.activities.map(activity => {
            if (activity.event_id === eventId) {
              return { ...activity, eventName: event.event_name };
            }
            return activity;
          });
        }
      });
    }
  }
}