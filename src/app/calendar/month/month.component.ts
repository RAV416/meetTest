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
  selectedDate = model<Date | null>(null);
}
