import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FormComponent } from './features/user/user-form.component';
import { NotFoundComponent } from './app.error';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { EventComponent } from './features/event/event-list.component';
import { UserComponent } from './features/user/user.component';
import { EventFormComponent } from './features/event/event-form.component';
import { EventsOverviewComponent } from './features/overview/calendar-overview.component';
import { EventDetailComponent } from './features/event/event-detail.component';
import { AuthGuard } from './guard/authGuard.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,  
    children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'full' },
      { path: 'calendar', component: EventsOverviewComponent },
      { path: 'user', component: UserComponent },
      { path: 'form/:mode', component: FormComponent },
      { path: 'eventForm/create', component: EventFormComponent },
      { path: 'eventForm/:id', component: EventFormComponent },
      { path: 'event', component: EventComponent },
      { path: 'eventDetail/:id', component: EventDetailComponent },
      { path: '**', component: NotFoundComponent },
    ], canActivate: [AuthGuard],
  },
];
