import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  upcomingEvents: Event[] = [];
  loading: boolean = true;
  
  constructor(private eventService: EventService) {}
  
  ngOnInit(): void {
    this.loadUpcomingEvents();
  }
  
  loadUpcomingEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        // Sort events by date and get the 3 closest upcoming events
        this.upcomingEvents = events
          .filter(event => new Date(event.event_date!) >= new Date())
          .sort((a, b) => new Date(a.event_date!).getTime() - new Date(b.event_date!).getTime())
          .slice(0, 3);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.loading = false;
      }
    });
  }
}