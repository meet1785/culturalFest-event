import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'events',
    loadChildren: () => import('./components/events/events.routes').then(m => m.EVENTS_ROUTES)
  },
  {
    path: 'activities',
    loadChildren: () => import('./components/activities/activities.routes').then(m => m.ACTIVITIES_ROUTES)
  },
  {
    path: 'venues',
    loadChildren: () => import('./components/venues/venues.routes').then(m => m.VENUES_ROUTES)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/users/users.routes').then(m => m.USERS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
