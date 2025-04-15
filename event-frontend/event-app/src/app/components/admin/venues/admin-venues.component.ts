import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueService } from '../../../services/venue.service';
import { Venue } from '../../../models/venue.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-venues',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Manage Venues</h2>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <div class="mb-3">
      <button class="btn btn-primary" (click)="showCreateForm = true">Create New Venue</button>
    </div>
    <div *ngIf="showCreateForm">
      <h4>Create Venue</h4>
      <form (ngSubmit)="createVenue()">
        <input [(ngModel)]="newVenue.venue_name" name="venue_name" placeholder="Venue Name" class="form-control mb-2" required />
        <input [(ngModel)]="newVenue.location" name="location" placeholder="Location" class="form-control mb-2" />
        <input [(ngModel)]="newVenue.capacity" name="capacity" type="number" placeholder="Capacity" class="form-control mb-2" />
        <button class="btn btn-success" type="submit">Save</button>
        <button class="btn btn-secondary ms-2" type="button" (click)="showCreateForm = false">Cancel</button>
      </form>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Capacity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let venue of venues">
          <td *ngIf="editVenueId !== venue.venue_id">{{ venue.venue_name }}</td>
          <td *ngIf="editVenueId !== venue.venue_id">{{ venue.location }}</td>
          <td *ngIf="editVenueId !== venue.venue_id">{{ venue.capacity }}</td>
          <td *ngIf="editVenueId !== venue.venue_id">
            <button class="btn btn-sm btn-warning me-2" (click)="startEdit(venue)">Edit</button>
            <button class="btn btn-sm btn-danger" (click)="deleteVenue(venue.venue_id!)">Delete</button>
          </td>
          <ng-container *ngIf="editVenueId === venue.venue_id">
            <td colspan="2">
              <input [(ngModel)]="editVenue.venue_name" name="edit_venue_name" class="form-control mb-2" required />
              <input [(ngModel)]="editVenue.location" name="edit_location" class="form-control mb-2" />
              <input [(ngModel)]="editVenue.capacity" name="edit_capacity" type="number" class="form-control mb-2" />
            </td>
            <td>
              <button class="btn btn-success btn-sm" (click)="updateVenue()">Save</button>
              <button class="btn btn-secondary btn-sm ms-2" (click)="cancelEdit()">Cancel</button>
            </td>
          </ng-container>
        </tr>
      </tbody>
    </table>
  `
})
export class AdminVenuesComponent implements OnInit {
  venues: Venue[] = [];
  error = '';
  showCreateForm = false;
  newVenue: Partial<Venue> = {};
  editVenueId: number | null = null;
  editVenue: Partial<Venue> = {};

  constructor(private venueService: VenueService) {}

  ngOnInit() {
    this.loadVenues();
  }

  loadVenues() {
    this.venueService.getAllVenues().subscribe({
      next: venues => this.venues = venues,
      error: () => this.error = 'Failed to load venues.'
    });
  }

  createVenue() {
    this.venueService.createVenue(this.newVenue as Venue).subscribe({
      next: () => {
        this.showCreateForm = false;
        this.newVenue = {};
        this.loadVenues();
      },
      error: () => this.error = 'Failed to create venue.'
    });
  }

  startEdit(venue: Venue) {
    this.editVenueId = venue.venue_id!;
    this.editVenue = { ...venue };
  }

  updateVenue() {
    this.venueService.updateVenue(this.editVenue as Venue).subscribe({
      next: () => {
        this.editVenueId = null;
        this.editVenue = {};
        this.loadVenues();
      },
      error: () => this.error = 'Failed to update venue.'
    });
  }

  cancelEdit() {
    this.editVenueId = null;
    this.editVenue = {};
  }

  deleteVenue(id: number) {
    if (confirm('Are you sure you want to delete this venue?')) {
      this.venueService.deleteVenue(id).subscribe({
        next: () => this.loadVenues(),
        error: () => this.error = 'Failed to delete venue.'
      });
    }
  }
}
