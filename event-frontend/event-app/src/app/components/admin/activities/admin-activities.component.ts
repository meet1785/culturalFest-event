import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../../../services/activity.service';
import { EventService } from '../../../services/event.service';
import { VenueService } from '../../../services/venue.service';
import { Activity } from '../../../models/activity.model';
import { Event } from '../../../models/event.model';
import { Venue } from '../../../models/venue.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Manage Activities</h2>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <div class="mb-3">
      <button class="btn btn-primary" (click)="showCreateForm = true">Create New Activity</button>
    </div>
    <div *ngIf="showCreateForm">
      <h4>Create Activity</h4>
      <form (ngSubmit)="createActivity()">
        <input [(ngModel)]="newActivity.activity_name" name="activity_name" placeholder="Activity Name" class="form-control mb-2" required />
        <textarea [(ngModel)]="newActivity.activity_description" name="activity_description" placeholder="Description" class="form-control mb-2"></textarea>
        <select [(ngModel)]="newActivity.event_id" name="event_id" class="form-control mb-2" required>
          <option [ngValue]="null">Select Event</option>
          <option *ngFor="let event of events" [ngValue]="event.event_id">{{ event.event_name }}</option>
        </select>
        <select [(ngModel)]="newActivity.venue_id" name="venue_id" class="form-control mb-2" required>
          <option [ngValue]="null">Select Venue</option>
          <option *ngFor="let venue of venues" [ngValue]="venue.venue_id">{{ venue.venue_name }}</option>
        </select>
        <button class="btn btn-success" type="submit">Save</button>
        <button class="btn btn-secondary ms-2" type="button" (click)="showCreateForm = false">Cancel</button>
      </form>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Event</th>
          <th>Venue</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let activity of activities">
          <td *ngIf="editActivityId !== activity.activity_id">{{ activity.activity_name }}</td>
          <td *ngIf="editActivityId !== activity.activity_id">{{ activity.activity_description }}</td>
          <td *ngIf="editActivityId !== activity.activity_id">{{ getEventName(activity.event_id) }}</td>
          <td *ngIf="editActivityId !== activity.activity_id">{{ getVenueName(activity.venue_id) }}</td>
          <td *ngIf="editActivityId !== activity.activity_id">
            <button class="btn btn-sm btn-warning me-2" (click)="startEdit(activity)">Edit</button>
            <button class="btn btn-sm btn-danger" (click)="deleteActivity(activity)">Delete</button>
          </td>
          <ng-container *ngIf="editActivityId === activity.activity_id">
            <td colspan="3">
              <input [(ngModel)]="editActivity.activity_name" name="edit_activity_name" class="form-control mb-2" required />
              <textarea [(ngModel)]="editActivity.activity_description" name="edit_activity_description" class="form-control mb-2"></textarea>
              <select [(ngModel)]="editActivity.event_id" name="edit_event_id" class="form-control mb-2" required>
                <option [ngValue]="null">Select Event</option>
                <option *ngFor="let event of events" [ngValue]="event.event_id">{{ event.event_name }}</option>
              </select>
              <select [(ngModel)]="editActivity.venue_id" name="edit_venue_id" class="form-control mb-2" required>
                <option [ngValue]="null">Select Venue</option>
                <option *ngFor="let venue of venues" [ngValue]="venue.venue_id">{{ venue.venue_name }}</option>
              </select>
            </td>
            <td>
              <button class="btn btn-success btn-sm" (click)="updateActivity()">Save</button>
              <button class="btn btn-secondary btn-sm ms-2" (click)="cancelEdit()">Cancel</button>
            </td>
          </ng-container>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  events: Event[] = [];
  venues: Venue[] = [];
  error = '';
  showCreateForm = false;
  newActivity: Partial<Activity> = {};
  editActivityId: number | null = null;
  editActivity: Partial<Activity> = {};

  constructor(
    private activityService: ActivityService,
    private eventService: EventService,
    private venueService: VenueService
  ) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.eventService.getAllEvents().subscribe({
      next: events => this.events = events,
      error: () => this.error = 'Failed to load events.'
    });
    this.venueService.getAllVenues().subscribe({
      next: venues => this.venues = venues,
      error: () => this.error = 'Failed to load venues.'
    });
    this.loadActivities();
  }

  loadActivities() {
    // For demo, just load activities for the first event (or all events in a real app)
    if (this.events.length > 0) {
      this.activityService.getActivitiesByEventId(this.events[0].event_id!).subscribe({
        next: activities => this.activities = activities,
        error: () => this.error = 'Failed to load activities.'
      });
    }
  }

  createActivity() {
    if (!this.newActivity.event_id) return;
    this.activityService.createActivity(this.newActivity.event_id, this.newActivity as Activity).subscribe({
      next: () => {
        this.showCreateForm = false;
        this.newActivity = {};
        this.loadActivities();
      },
      error: () => this.error = 'Failed to create activity.'
    });
  }

  startEdit(activity: Activity) {
    this.editActivityId = activity.activity_id!;
    this.editActivity = { ...activity };
  }

  updateActivity() {
    if (!this.editActivity.event_id) return;
    this.activityService.updateActivity(this.editActivity.event_id, this.editActivity as Activity).subscribe({
      next: () => {
        this.editActivityId = null;
        this.editActivity = {};
        this.loadActivities();
      },
      error: () => this.error = 'Failed to update activity.'
    });
  }

  cancelEdit() {
    this.editActivityId = null;
    this.editActivity = {};
  }

  deleteActivity(activity: Activity) {
    if (confirm('Are you sure you want to delete this activity?')) {
      this.activityService.deleteActivity(activity.event_id, activity.activity_id!).subscribe({
        next: () => this.loadActivities(),
        error: () => this.error = 'Failed to delete activity.'
      });
    }
  }

  getEventName(eventId: number | undefined) {
    return this.events.find(e => e.event_id === eventId)?.event_name || '';
  }

  getVenueName(venueId: number | undefined) {
    return this.venues.find(v => v.venue_id === venueId)?.venue_name || '';
  }
}
