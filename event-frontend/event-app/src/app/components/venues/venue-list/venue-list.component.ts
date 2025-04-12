import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VenueService } from '../../../services/venue.service';
import { Venue } from '../../../models/venue.model';

@Component({
  selector: 'app-venue-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './venue-list.component.html',
  styleUrl: './venue-list.component.scss'
})
export class VenueListComponent implements OnInit {
  venues: Venue[] = [];
  loading = false;
  error = '';

  constructor(private venueService: VenueService) {}

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues(): void {
    this.loading = true;
    this.venueService.getAllVenues()
      .subscribe({
        next: (venues) => {
          this.venues = venues;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load venues. Please try again later.';
          console.error('Error loading venues:', error);
          this.loading = false;
        }
      });
  }
}