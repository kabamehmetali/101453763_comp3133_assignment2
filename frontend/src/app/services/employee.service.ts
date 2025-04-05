import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl; // Using a relative URL (e.g., '/graphql')

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('sessionToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  getEmployees() {
    const query = `
      query {
        employees {
          id
          firstName
          lastName
          email
          department
          position
          profilePicture
          createdAt
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  addEmployee(employee: any) {
    const query = `
      mutation {
        addEmployee(input: {
          firstName: ${JSON.stringify(employee.firstName)},
          lastName: ${JSON.stringify(employee.lastName)},
          email: ${JSON.stringify(employee.email)},
          department: ${JSON.stringify(employee.department)},
          position: ${JSON.stringify(employee.position)},
          profilePicture: ${JSON.stringify(employee.profilePicture)}
        }) {
          id
          firstName
          lastName
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  getEmployeeById(id: string) {
    const query = `
      query {
        employee(id: "${id}") {
          id
          firstName
          lastName
          email
          department
          position
          profilePicture
          createdAt
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  updateEmployee(id: string, employee: any) {
    const query = `
      mutation {
        updateEmployee(id: "${id}", input: {
          firstName: ${JSON.stringify(employee.firstName)},
          lastName: ${JSON.stringify(employee.lastName)},
          email: ${JSON.stringify(employee.email)},
          department: ${JSON.stringify(employee.department)},
          position: ${JSON.stringify(employee.position)},
          profilePicture: ${JSON.stringify(employee.profilePicture)}
        }) {
          id
          firstName
          lastName
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  deleteEmployee(id: string) {
    const query = `
      mutation {
        deleteEmployee(id: "${id}") {
          id
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }

  searchEmployees(criteria: { department?: string, position?: string }) {
    const query = `
      query {
        employees(department: "${criteria.department || ''}", position: "${criteria.position || ''}") {
          id
          firstName
          lastName
          email
          department
          position
          profilePicture
          createdAt
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, { query }, { headers: this.getHeaders() });
  }
}
