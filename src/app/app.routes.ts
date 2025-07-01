import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FormComponent } from './features/user/user-form.component';
import { NotFoundComponent } from './app.error';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { EventComponent } from './features/event/event.component';
import { UserComponent } from './features/user/user.component';
import { EventFormComponent } from './features/event/event-form.component';
import { EventsOverviewComponent } from './features/overview/calendar-overview.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'full' },
      { path: 'calendar', component: EventsOverviewComponent },
      { path: 'user', component: UserComponent },
      { path: 'form/:mode', component: FormComponent },
      { path: 'eventForm', component: EventFormComponent },
      { path: 'event', component: EventComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
