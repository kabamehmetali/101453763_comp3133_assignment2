// Path: src/app/shared/header/header.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// Create a stub for AuthService
class AuthServiceStub {
  isAuthenticated = new BehaviorSubject<boolean>(false);
  logout = jasmine.createSpy('logout');
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useClass: AuthServiceStub }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as any;
    fixture.detectChanges();
  });

  it('should display Login and Register links when not authenticated', () => {
    // Set authentication to false
    authService.isAuthenticated.next(false);
    fixture.detectChanges();

    // Expect login and register links are found
    const loginLink: DebugElement = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
    const registerLink: DebugElement = fixture.debugElement.query(By.css('a[routerLink="/signup"]'));
    const employeeLink: DebugElement = fixture.debugElement.query(By.css('a[routerLink="/employees"]'));
    const logoutButton: DebugElement = fixture.debugElement.query(By.css('button'));

    expect(loginLink).toBeTruthy();
    expect(registerLink).toBeTruthy();
    // Should not display employees link nor logout button when not authenticated
    expect(employeeLink).toBeNull();
    expect(logoutButton).toBeNull();
  });

  it('should display Employees link and Logout button when authenticated', () => {
    // Set authentication to true
    authService.isAuthenticated.next(true);
    fixture.detectChanges();

    // Expect employees link and logout button are found
    const employeeLink: DebugElement = fixture.debugElement.query(By.css('a[routerLink="/employees"]'));
    const logoutButton: DebugElement = fixture.debugElement.query(By.css('button'));

    // Login and register links should not be visible
    const loginLink: DebugElement = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
    const registerLink: DebugElement = fixture.debugElement.query(By.css('a[routerLink="/signup"]'));

    expect(employeeLink).toBeTruthy();
    expect(logoutButton).toBeTruthy();
    expect(loginLink).toBeNull();
    expect(registerLink).toBeNull();
  });

  it('should call logout method when logout button is clicked', () => {
    authService.isAuthenticated.next(true);
    fixture.detectChanges();

    const logoutButton: DebugElement = fixture.debugElement.query(By.css('button'));
    logoutButton.triggerEventHandler('click', null);
    expect(authService.logout).toHaveBeenCalled();
  });
});

// Import AuthService for type checking
import { AuthService } from '../../services/auth.service';
