import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-view.component.html',
})
export class EmployeeViewComponent implements OnInit {
  employee: any;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res) => this.employee = res.data.employee,
      error: () => this.errorMessage = 'Failed to load employee details.'
    });
  }
}
