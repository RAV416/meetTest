import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FormComponent } from './shared/form/form.component';
import { NotFoundComponent } from './app.error';
import { CalendarComponent } from './features/calendar/calendar.component';
import { EventComponent } from './features/event/event.component';
import { UserComponent } from './features/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'full' },
      { path: 'calendar', component: CalendarComponent },
      { path: 'user', component: UserComponent },
      { path: 'form/:mode', component: FormComponent },
      { path: 'event', component: EventComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
