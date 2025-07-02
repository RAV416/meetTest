import { Component, EventEmitter, forwardRef, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timeGrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [CommonModule, RouterOutlet, FullCalendarModule, ],
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin , timeGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    selectable: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
  };

  @Output() dateSelected = new EventEmitter<string>();

  handleDateClick(arg: DateClickArg) {
      this.dateSelected.emit(arg.dateStr);
  }

  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}