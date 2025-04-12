import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { API_ENDPOINTS } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(API_ENDPOINTS.EVENTS);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${API_ENDPOINTS.EVENTS}/${id}`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(API_ENDPOINTS.EVENTS, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${API_ENDPOINTS.EVENTS}/${event.event_id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.EVENTS}/${id}`);
  }
}