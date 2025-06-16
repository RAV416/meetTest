import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar.component';
import { FooterComponent } from '../footer.component';
import { FormComponent } from '../../shared/form/form.component';
import { User } from 'firebase/auth';
import { AuthService } from '../../shared/form/user-auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { UserService } from '../../features/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule, NavbarComponent, FooterComponent, AsyncPipe, CommonModule, FormComponent],
  styles: [],
  standalone: true,
})
export class HomeComponent {
  private userService: UserService = inject(UserService);
   private authService: AuthService = inject(AuthService);
user$ = this.authService.user$

;


login() {
  this.authService.login('test@example.com', 'password123');
}

logout() {
  this.authService.logout();
}
}
