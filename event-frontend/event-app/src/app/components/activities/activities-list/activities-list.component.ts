import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../../../services/activity.service';
import { EventService } from '../../../services/event.service';
import { VenueService } from '../../../services/venue.service';
import { Activity } from '../../../models/activity.model';
import { Event } from '../../../models/event.model';
import { Venue } from '../../../models/venue.model';
import { forkJoin } from 'rxjs';

interface ActivityViewModel extends Activity {
  eventName?: string;
  venueName?: string;
}

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activities-list.component.html',
  styleUrl: './activities-list.component.scss'
})
export class ActivitiesListComponent implements OnInit {
  activities: ActivityViewModel[] = [];
  events: Map<number, Event> = new Map();
  venues: Map<number, Venue> = new Map();
  loading = true;
  error = '';

  constructor(
    private activityService: ActivityService,
    private eventService: EventService,
    private venueService: VenueService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    
    // Load events and venues first
    forkJoin({
      events: this.eventService.getAllEvents(),
      venues: this.venueService.getAllVenues()
    }).subscribe({
      next: (data) => {
        // Store events and venues in maps for quick lookup
        data.events.forEach(event => this.events.set(event.event_id!, event));
        data.venues.forEach(venue => this.venues.set(venue.venue_id!, venue));
        
        // Now that we have events and venues, load activities
        this.loadActivities();
      },
      error: (error) => {
        this.error = 'Failed to load data. Please try again later.';
        console.error('Error loading data:', error);
        this.loading = false;
      }
    });
  }

  loadActivities(): void {
    // In a real application, we'd have a dedicated API endpoint to get all activities
    // Since our backend structure is event-centric, we'd need to iterate through events
    // This is a simplified approach
    const eventIds = Array.from(this.events.keys());
    
    // For demo purposes, we'll use a sample event ID
    if (eventIds.length > 0) {
      this.activityService.getActivitiesByEventId(eventIds[0]).subscribe({
        next: (activities) => {
          this.activities = activities.map(activity => {
            return {
              ...activity,
              eventName: this.events.get(activity.event_id!)?.event_name,
              venueName: this.venues.get(activity.venue_id)?.venue_name
            };
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load activities. Please try again later.';
          console.error('Error loading activities:', error);
          this.loading = false;
        }
      });
    } else {
      this.activities = [];
      this.loading = false;
    }
  }
}