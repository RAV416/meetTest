import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule, NavbarComponent, FooterComponent],
  styles: [],
  standalone: true,
})
export class HomeComponent {}
