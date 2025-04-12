import { Routes } from '@angular/router';

export const VENUES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./venue-list/venue-list.component').then(m => m.VenueListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./venue-detail/venue-detail.component').then(m => m.VenueDetailComponent)
  }
];