import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [],
  imports: [FormsModule,RouterModule],
  standalone: true,
})
export class FormComponent {

  private userService: UserService = inject(UserService);

  model: UserModel = {
    name: '',
    surname: '',
    email: '',
    password: '',
    image: '',
    role: '',
  };

  onSubmit() {
    const user: UserModel = this.model;
    this.userService.addUser(user);
  }
}
