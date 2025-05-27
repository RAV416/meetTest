import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">SpotkaniaApp</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" routerLink="/home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/calendar">Calendar</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/list">Users</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/form">Add User</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  imports: [RouterModule],
  styles: [],
  standalone: true,
})
export class NavbarComponent {}
