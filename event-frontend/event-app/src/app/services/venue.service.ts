import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venue } from '../models/venue.model';
import { API_ENDPOINTS } from '../core/constants/api.constants';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  constructor(private http: HttpClient) {}

  getAllVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(API_ENDPOINTS.VENUES.BASE);
  }

  getVenueById(id: number): Observable<Venue> {
    return this.http.get<Venue>(API_ENDPOINTS.VENUES.GET_BY_ID(id));
  }

  getVenueActivities(id: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(API_ENDPOINTS.VENUES.ACTIVITIES(id));
  }

  createVenue(venue: Venue): Observable<Venue> {
    return this.http.post<Venue>(API_ENDPOINTS.VENUES.BASE, venue);
  }

  updateVenue(venue: Venue): Observable<Venue> {
    return this.http.put<Venue>(API_ENDPOINTS.VENUES.GET_BY_ID(venue.venue_id!), venue);
  }

  deleteVenue(id: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.VENUES.GET_BY_ID(id));
  }
}