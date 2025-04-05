// Path: src/app/app.component.ts
// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { HeaderComponent } from './shared/header/header.component';
// import { ServerInfoComponent } from './components/server-info/server-info.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterModule, HeaderComponent, ServerInfoComponent],
//   template: `
//     <app-header></app-header>
//     <app-server-info></app-server-info>
//     <router-outlet></router-outlet>
//   `,
// })
// export class AppComponent {}


// Path: src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
