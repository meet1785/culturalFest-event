import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const ACTIVITIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./activities-list/activities-list.component').then(m => m.ActivitiesListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./activity-detail/activity-detail.component').then(m => m.ActivityDetailComponent)
  },
  {
    path: ':id/register',
    loadComponent: () => import('./activity-registration/activity-registration.component').then(m => m.ActivityRegistrationComponent),
    canActivate: [authGuard]
  }
];