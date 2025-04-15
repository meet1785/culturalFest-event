import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { User } from '../models/user.model';
import { API_ENDPOINTS } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(API_ENDPOINTS.EVENTS.BASE);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(API_ENDPOINTS.EVENTS.GET_BY_ID(id));
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(API_ENDPOINTS.EVENTS.BASE, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(API_ENDPOINTS.EVENTS.GET_BY_ID(event.event_id!), event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.EVENTS.GET_BY_ID(id));
  }

  getEventParticipants(eventId: number): Observable<User[]> {
    return this.http.get<User[]>(`${API_ENDPOINTS.EVENTS.BASE}/${eventId}/participants`);
  }
}