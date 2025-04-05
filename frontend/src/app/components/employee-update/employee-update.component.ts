import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-update.component.html',
})
export class EmployeeUpdateComponent implements OnInit {
  updateForm: FormGroup;
  errorMessage: string = '';
  employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.updateForm = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      profilePicture: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (res) => {
        const emp = res.data.employee;
        this.updateForm.patchValue({
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          department: emp.department,
          position: emp.position,
          profilePicture: emp.profilePicture
        });
      },
      error: () => this.errorMessage = 'Failed to load employee details.'
    });
  }

  onSubmit() {
    if (this.updateForm.invalid) return;
    this.employeeService.updateEmployee(this.employeeId, this.updateForm.value).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => this.errorMessage = 'Update failed.'
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.updateForm.patchValue({
        profilePicture: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  }
}
