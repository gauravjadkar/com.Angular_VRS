import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="card">
      <h2>Welcome to RentRover</h2>
      <p>Browse vehicles, add to Watch Later, and book your ride.</p>
      <div style="display:flex; gap:.5rem; margin-top:.75rem;">
        <a class="btn primary" routerLink="/booking">Start Booking</a>
        
      </div>
    </div>
  
    

  `,
  imports: [RouterLink]
})
export class HomeComponent {}