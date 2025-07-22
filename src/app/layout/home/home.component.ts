import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar.component';
import { FooterComponent } from '../footer.component';
import { FormComponent } from '../../features/user/user-form.component';
import { AuthService } from '../../features/user/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DeleteModalComponent } from "../../shared/modal/delete-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    RouterModule,
    NavbarComponent,
    FooterComponent,
    AsyncPipe,
    CommonModule,
    FormComponent,
    DeleteModalComponent
],
  styles: [],
  standalone: true,
})
export class HomeComponent {
  private authService: AuthService = inject(AuthService);
  user$ = this.authService.user$;
  showDeleteModal= false;


  login() {
    this.authService.login('test@example.com', 'password123');
  }

  logout() {
    this.authService.logout();
  }
  deleteUser(){
    this.authService.deleteCurrentUser();
  }
}
