import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { NotFoundComponent } from './app.error';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  {path: '' , component: HomeComponent, children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'full' },
      { path: 'calendar', component: CalendarComponent },
      { path: 'list', component: ListComponent },
      { path: 'form', component: FormComponent },
      { path: '**', component: NotFoundComponent },
    ]
  },
  
];
