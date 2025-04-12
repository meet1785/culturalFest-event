import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityRegistration } from '../models/activity-registration.model';
import { API_ENDPOINTS } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  registerForActivity(eventId: number, activityId: number, registration: ActivityRegistration): Observable<any> {
    return this.http.post(API_ENDPOINTS.ACTIVITIES.REGISTER(eventId, activityId), registration);
  }

  getUserRegistrations(): Observable<ActivityRegistration[]> {
    return this.http.get<ActivityRegistration[]>(API_ENDPOINTS.USERS.REGISTRATIONS);
  }

  cancelRegistration(registrationId: number): Observable<any> {
    return this.http.delete(API_ENDPOINTS.USERS.CANCEL_REGISTRATION(registrationId));
  }
}