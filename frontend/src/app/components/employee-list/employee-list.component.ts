import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FilterPipe],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  filterText: string = '';
  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res.data.employees;
      },
      error: () => {
        this.errorMessage = 'Failed to load employees.';
      }
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.fetchEmployees(),
        error: () => this.errorMessage = 'Delete failed.'
      });
    }
  }
}
