import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-add.component.html',
})
export class EmployeeAddComponent {
  addForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.addForm = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      profilePicture: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addForm.invalid) return;
    this.employeeService.addEmployee(this.addForm.value).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => this.errorMessage = 'Failed to add employee.'
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.addForm.patchValue({
        profilePicture: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  }
}
