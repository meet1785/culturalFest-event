import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityRegistration } from '../models/activity-registration.model';
import { API_ENDPOINTS, environment } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  registerForActivity(eventId: number, activityId: number, registration: ActivityRegistration): Observable<any> {
    return this.http.post(API_ENDPOINTS.ACTIVITY_REGISTRATION(eventId, activityId), registration);
  }

  getRegistrationsByActivityId(eventId: number, activityId: number): Observable<ActivityRegistration[]> {
    return this.http.get<ActivityRegistration[]>(API_ENDPOINTS.ACTIVITY_REGISTRATION(eventId, activityId));
  }

  getRegistrationsByUserId(userId: number): Observable<ActivityRegistration[]> {
    return this.http.get<ActivityRegistration[]>(`${environment.apiUrl}/users/${userId}/registrations`);
  }

  cancelRegistration(eventId: number, activityId: number, registrationId: number): Observable<any> {
    return this.http.delete(`${API_ENDPOINTS.ACTIVITY_REGISTRATION(eventId, activityId)}/${registrationId}`);
  }
}