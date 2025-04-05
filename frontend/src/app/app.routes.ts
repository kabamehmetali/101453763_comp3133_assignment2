// Path: src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee/add', component: EmployeeAddComponent },
  { path: 'employee/view/:id', component: EmployeeViewComponent },
  { path: 'employee/update/:id', component: EmployeeUpdateComponent },
  { path: '**', redirectTo: 'login' },
];
