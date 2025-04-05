// Path: src/app/components/server-info/server-info.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-server-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h3>Server Information</h3>
      <pre>{{ serverInfo | json }}</pre>
    </div>
  `,
})
export class ServerInfoComponent implements OnInit {
  serverInfo: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Here we use a sample query. Adjust the query as needed.
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

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post<any>(environment.apiUrl, { query }, { headers })
      .subscribe({
        next: (res) => {
          this.serverInfo = res;
        },
        error: (err) => {
          this.serverInfo = { error: err.message };
        },
      });
  }
}
