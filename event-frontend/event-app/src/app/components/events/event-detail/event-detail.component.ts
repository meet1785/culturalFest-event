import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { ActivityService } from '../../../services/activity.service';
import { Event } from '../../../models/event.model';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  activities: Activity[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const eventId = Number(params.get('id'));
      if (eventId) {
        this.loadEventDetails(eventId);
      } else {
        this.error = 'Invalid event ID';
        this.loading = false;
      }
    });
  }

  loadEventDetails(eventId: number): void {
    this.loading = true;
    this.eventService.getEventById(eventId).subscribe({
      next: (event) => {
        this.event = event;
        this.loadActivities(eventId);
      },
      error: (error) => {
        this.error = 'Failed to load event details. Please try again later.';
        console.error('Error loading event details:', error);
        this.loading = false;
      }
    });
  }

  loadActivities(eventId: number): void {
    this.activityService.getActivitiesByEventId(eventId).subscribe({
      next: (activities) => {
        this.activities = activities;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        this.loading = false;
      }
    });
  }
}