import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Manage Events</h2>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <div class="mb-3">
      <button class="btn btn-primary" (click)="showCreateForm = true">Create New Event</button>
    </div>
    <div *ngIf="showCreateForm">
      <h4>Create Event</h4>
      <form (ngSubmit)="createEvent()">
        <input [(ngModel)]="newEvent.event_name" name="event_name" placeholder="Event Name" class="form-control mb-2" required />
        <textarea [(ngModel)]="newEvent.event_description" name="event_description" placeholder="Description" class="form-control mb-2"></textarea>
        <button class="btn btn-success" type="submit">Save</button>
        <button class="btn btn-secondary ms-2" type="button" (click)="showCreateForm = false">Cancel</button>
      </form>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let event of events">
          <td *ngIf="editEventId !== event.event_id">{{ event.event_name }}</td>
          <td *ngIf="editEventId !== event.event_id">{{ event.event_description }}</td>
          <td *ngIf="editEventId !== event.event_id">
            <button class="btn btn-sm btn-warning me-2" (click)="startEdit(event)">Edit</button>
            <button class="btn btn-sm btn-danger" (click)="deleteEvent(event.event_id!)">Delete</button>
          </td>
          <ng-container *ngIf="editEventId === event.event_id">
            <td colspan="2">
              <input [(ngModel)]="editEvent.event_name" name="edit_event_name" class="form-control mb-2" required />
              <textarea [(ngModel)]="editEvent.event_description" name="edit_event_description" class="form-control mb-2"></textarea>
            </td>
            <td>
              <button class="btn btn-success btn-sm" (click)="updateEvent()">Save</button>
              <button class="btn btn-secondary btn-sm ms-2" (click)="cancelEdit()">Cancel</button>
            </td>
          </ng-container>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminEventsComponent implements OnInit {
  events: Event[] = [];
  error = '';
  showCreateForm = false;
  newEvent: Partial<Event> = {};
  editEventId: number | null = null;
  editEvent: Partial<Event> = {};

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: events => this.events = events,
      error: err => this.error = 'Failed to load events.'
    });
  }

  createEvent() {
    this.eventService.createEvent(this.newEvent as Event).subscribe({
      next: () => {
        this.showCreateForm = false;
        this.newEvent = {};
        this.loadEvents();
      },
      error: err => this.error = 'Failed to create event.'
    });
  }

  startEdit(event: Event) {
    this.editEventId = event.event_id!;
    this.editEvent = { ...event };
  }

  updateEvent() {
    this.eventService.updateEvent(this.editEvent as Event).subscribe({
      next: () => {
        this.editEventId = null;
        this.editEvent = {};
        this.loadEvents();
      },
      error: err => this.error = 'Failed to update event.'
    });
  }

  cancelEdit() {
    this.editEventId = null;
    this.editEvent = {};
  }

  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => this.loadEvents(),
        error: err => this.error = 'Failed to delete event.'
      });
    }
  }
}
