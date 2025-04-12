import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';
import { API_ENDPOINTS } from '../core/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getActivitiesByEventId(eventId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(API_ENDPOINTS.ACTIVITIES.BY_EVENT(eventId));
  }

  getActivityById(eventId: number, activityId: number): Observable<Activity> {
    return this.http.get<Activity>(API_ENDPOINTS.ACTIVITIES.GET_BY_ID(eventId, activityId));
  }

  createActivity(eventId: number, activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(API_ENDPOINTS.ACTIVITIES.BY_EVENT(eventId), activity);
  }

  updateActivity(eventId: number, activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(API_ENDPOINTS.ACTIVITIES.GET_BY_ID(eventId, activity.activity_id!), activity);
  }

  deleteActivity(eventId: number, activityId: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.ACTIVITIES.GET_BY_ID(eventId, activityId));
  }
}