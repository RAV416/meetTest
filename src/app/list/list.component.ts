import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
  imports: [AsyncPipe, RouterModule],
  standalone: true,
})
export class ListComponent {
  userService: UserService = inject(UserService);

  readonly users$: Observable<UserModel[]> = this.userService.getUsers();
}
