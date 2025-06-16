import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  styleUrls: ['./month.component.scss'],
  standalone: true,
})
export class MonthComponent {
  mode = 'create';
  selectedDates = model<Date[]>([]);

  isSelected(date: Date): boolean {
    return this.selectedDates().some(
      (d) => d.toDateString() === date.toDateString()
    );
  }
  dateClass = (date: Date): string => {
    return this.isSelected(date) ? 'selected-date' : '';
  };
  onDateSelected(date: Date | null): void {
    const current = this.selectedDates();
    const index = current.findIndex(
      (d) => date && d.toDateString() === date.toDateString()
    );
    if (index > -1) {
      const updated = [...current];
      updated.splice(index, 1);
      this.selectedDates.set(updated.sort((a, b) => a.getTime() - b.getTime()));
    } else {
      if (date) {
        const updated = [...current, date];
        this.selectedDates.set(updated.sort((a, b) => a.getTime() - b.getTime())
        );
      }
    }
  }
}
