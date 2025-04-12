import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VenueService } from '../../../services/venue.service';
import { ActivityService } from '../../../services/activity.service';
import { EventService } from '../../../services/event.service';
import { Venue } from '../../../models/venue.model';
import { Activity } from '../../../models/activity.model';
import { Event } from '../../../models/event.model';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface ActivityWithEvent extends Activity {
  eventName?: string;
}

@Component({
  selector: 'app-venue-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './venue-detail.component.html',
  styleUrl: './venue-detail.component.scss'
})
export class VenueDetailComponent implements OnInit {
  venue: Venue | null = null;
  activities: ActivityWithEvent[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private venueService: VenueService,
    private activityService: ActivityService,
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
        return this.venueService.getVenueById(id);
      }),
      switchMap(venue => {
        if (!venue) return of({ venue: null, events: [], activities: [] });
        
        this.venue = venue;
        
        // In a real app, we would have an API to get activities by venue ID directly
        // For this demo, we'll load events and activities and filter manually
        return forkJoin({
          venue: of(venue),
          events: this.eventService.getAllEvents(),
          // We'd need a custom API endpoint for this in a real application
          activities: of([]) // Placeholder, we'll handle this below
        });
      })
    ).subscribe({
      next: (result) => {
        if (result && result.venue) {
          this.venue = result.venue;
          
          // For demo purposes, we'll simulate activities for this venue
          // In a real app, this would come from the API
          this.simulateActivitiesForVenue(result.events);
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

  private simulateActivitiesForVenue(events: Event[]): void {
    // This is a placeholder to simulate activities for a venue
    // In a real app, you would fetch actual activities from the backend
    if (events.length > 0 && this.venue) {
      // For demo purposes, let's create a couple of mock activities
      this.activities = [
        {
          activity_id: 1,
          event_id: events[0].event_id,
          venue_id: this.venue.venue_id!,
          activity_name: "Opening Ceremony",
          activity_description: "Welcome event to kickstart the cultural festival",
          start_time: new Date(2025, 3, 15, 10, 0),
          end_time: new Date(2025, 3, 15, 12, 0),
          eventName: events[0].event_name
        },
        {
          activity_id: 2,
          event_id: events[0].event_id,
          venue_id: this.venue.venue_id!,
          activity_name: "Music Competition",
          activity_description: "Showcase your musical talent",
          start_time: new Date(2025, 3, 15, 14, 0),
          end_time: new Date(2025, 3, 15, 17, 0),
          eventName: events[0].event_name
        }
      ];
    }
  }
}