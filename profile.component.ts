import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { Customer } from '../models';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Customer Profile</h2>
      <form (ngSubmit)="load()">
        <div class="form-row">
          <div>
            <label>Customer ID</label>
    
            <input type="number" [(ngModel)]="id" name="id" required>
          </div>
          <div style="align-self:end;">
            <button class="btn primary" type="submit">Load</button>
          </div>
        </div>
      </form>
      @if (cust) {
        <div style="margin-top:.75rem;">
          <p><b>ID:</b> {{ cust!.cust_id }}</p>
          <p><b>Name:</b> {{ cust!.cust_name }}</p>
          <p><b>Phone No:</b>{{cust!.phone_no}}</p>
          <p><b>License No:</b>{{cust!.license_no}}</p>
          
          @if (cust!.email) { <p><b>Email:</b> {{ cust!.email }}</p> }
        </div>
      }
    </div>
  `
})
export class ProfileComponent {
  private api = inject(ApiService);
  id: number | null = null;
  cust?: Customer;

  load() {
    if (!this.id) return;
    this.api.getCustomer(this.id).subscribe(c => this.cust = c);
  }
}