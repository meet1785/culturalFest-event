import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./events/admin-events.component').then(m => m.AdminEventsComponent)
  },
  {
    path: 'activities',
    loadComponent: () => import('./activities/admin-activities.component').then(m => m.AdminActivitiesComponent)
  },
  {
    path: 'venues',
    loadComponent: () => import('./venues/admin-venues.component').then(m => m.AdminVenuesComponent)
  },
  {
    path: 'participants',
    loadComponent: () => import('./participants/admin-participants.component').then(m => m.AdminParticipantsComponent)
  }
];
