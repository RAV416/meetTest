import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
    MatCardModule
  ],
  styles: [],
  standalone: true,
})
export class MonthComponent {

  selectedDate: Date | null = null;
}
