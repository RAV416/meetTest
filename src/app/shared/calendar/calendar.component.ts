import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [CommonModule, FullCalendarModule],
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
})
export class CalendarComponent implements OnChanges {
  @Input() currentDates: string[] = [];
  @Output() dateSelected = new EventEmitter<string>();
  @Output() clickDate = new EventEmitter<string>();
  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentDates']) {
      this.selectedDates = [...this.currentDates];
      this.updateCalendarOptions();
    }
  }
  selectedDates: string[] = [];
  calendarOptions: CalendarOptions = {
    firstDay: 1,
    height: 'auto',
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: (click) => this.handleDateClick(click),
    dayCellClassNames: (arg) => {
      const date = arg.date.toLocaleDateString('en-CA');
      const isSelected = this.selectedDates.includes(date);
      return isSelected ? ['selected-date'] : [];
    },
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek',
    },
  };

  handleDateClick(arg: DateClickArg) {
    const idx = this.selectedDates.indexOf(arg.dateStr);
    if (idx > -1) {
      this.selectedDates.splice(idx, 1);
    } else {
      this.selectedDates.push(arg.dateStr);
    }
    this.dateSelected.emit(arg.dateStr);
    this.updateCalendarOptions();
  }

  updateCalendarOptions() {
    this.calendarOptions = {
      ...this.calendarOptions,
      dayCellClassNames: (arg) => {
        const date = arg.date.toLocaleDateString('en-CA');
        const isSelected = this.selectedDates.includes(date);
        return isSelected ? ['selected-date'] : [];
      },
    };
  }
}
