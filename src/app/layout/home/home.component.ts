import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar.component';
import { FooterComponent } from '../footer.component';
import { UserFormComponent } from '../../features/user/user-form.component';
import { AuthService } from '../../service/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DeleteModalComponent } from '../../shared/modal/delete-modal.component';
import { EventsOverviewComponent } from '../../features/overview/calendar-overview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent,
    AsyncPipe,
    CommonModule,
    DeleteModalComponent,
    UserFormComponent,
    EventsOverviewComponent,
  ],
  styles: [],
  standalone: true,
})
export class HomeComponent {
  private authService: AuthService = inject(AuthService);
  user$ = this.authService.user$;
  showDeleteModal = false;
  showCalendar = false;

  login() {
    this.authService.login('test@example.com', 'password123');
  }

  logout() {
    this.authService.logout();
  }
  deleteUser() {
    this.authService.deleteCurrentUser();
  }
}
