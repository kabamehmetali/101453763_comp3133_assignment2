// Path: src/app/shared/header/header.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Mehmet Ali KABA</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- Show "Employees" only if authenticated -->
            <ng-container *ngIf="authService.isAuthenticated | async; else notLoggedIn">
              <li class="nav-item">
                <a class="nav-link" routerLink="/employees">Employees</a>
              </li>
            </ng-container>
            <!-- Show Login and Register if NOT authenticated -->
            <ng-template #notLoggedIn>
              <li class="nav-item">
                <a class="nav-link" routerLink="/login">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/signup">Register</a>
              </li>
            </ng-template>
          </ul>
          <!-- Show Logout button if authenticated -->
          <ng-container *ngIf="authService.isAuthenticated | async">
            <button class="btn btn-outline-light" (click)="logout()">Logout</button>
          </ng-container>
        </div>
      </div>
    </nav>
  `,
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
