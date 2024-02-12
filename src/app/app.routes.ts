import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'forms',
    loadComponent: () => import('./components/forms/forms.component').then((m) => m.FormsComponent)
  },
  {
    path: 'pipe',
    loadComponent: () => import('./components/pipe/pipe.component').then((m) => m.PipeComponent)
  },
  {
    path: 'match-strings',
    loadComponent: () => import('./components/string-matcher/string-matcher.component').then((m) => m.StringMatcherComponent)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./components/calendar/calendar.component').then((m) => m.CalendarComponent)
  },
  {
    path: 'imdb',
    loadComponent: () => import('./components/imdb/imdb.component').then((m) => m.ImdbComponent)
  }
];
