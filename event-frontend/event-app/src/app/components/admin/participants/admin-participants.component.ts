import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { ActivityService } from '../../../services/activity.service';
import { Event } from '../../../models/event.model';
import { Activity } from '../../../models/activity.model';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-participants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Manage Participants</h2>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <div class="mb-3">
      <label>Select Event:</label>
      <select [(ngModel)]="selectedEventId" (change)="onEventChange()" class="form-select w-auto d-inline-block ms-2">
        <option [ngValue]="null">-- Select Event --</option>
        <option *ngFor="let event of events" [ngValue]="event.event_id">{{ event.event_name }}</option>
      </select>
    </div>
    <div *ngIf="activities.length > 0">
      <label>Select Activity:</label>
      <select [(ngModel)]="selectedActivityId" (change)="onActivityChange()" class="form-select w-auto d-inline-block ms-2">
        <option [ngValue]="null">-- All Activities --</option>
        <option *ngFor="let activity of activities" [ngValue]="activity.activity_id">{{ activity.activity_name }}</option>
      </select>
    </div>
    <div *ngIf="participants.length > 0">
      <h4 class="mt-4">Participants</h4>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of participants">
            <td>{{ user.full_name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div *ngIf="participants.length === 0 && selectedEventId">No participants found.</div>
  `
})
export class AdminParticipantsComponent implements OnInit {
  events: Event[] = [];
  activities: Activity[] = [];
  participants: User[] = [];
  selectedEventId: number | null = null;
  selectedActivityId: number | null = null;
  error = '';

  constructor(
    private eventService: EventService,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    this.eventService.getAllEvents().subscribe({
      next: events => this.events = events,
      error: () => this.error = 'Failed to load events.'
    });
  }

  onEventChange() {
    this.selectedActivityId = null;
    this.participants = [];
    if (this.selectedEventId) {
      this.activityService.getActivitiesByEventId(this.selectedEventId).subscribe({
        next: activities => this.activities = activities,
        error: () => this.error = 'Failed to load activities.'
      });
      // Load all event participants
      this.eventService.getEventParticipants(this.selectedEventId).subscribe({
        next: (users: User[]) => this.participants = users,
        error: () => this.error = 'Failed to load participants.'
      });
    } else {
      this.activities = [];
      this.participants = [];
    }
  }

  onActivityChange() {
    if (this.selectedEventId && this.selectedActivityId) {
      this.activityService.getActivityParticipants(this.selectedEventId, this.selectedActivityId).subscribe({
        next: (users: User[]) => this.participants = users,
        error: () => this.error = 'Failed to load participants.'
      });
    } else if (this.selectedEventId) {
      this.eventService.getEventParticipants(this.selectedEventId).subscribe({
        next: (users: User[]) => this.participants = users,
        error: () => this.error = 'Failed to load participants.'
      });
    } else {
      this.participants = [];
    }
  }
}
