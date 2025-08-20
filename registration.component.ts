import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
     
    <h2>Register</h2>
    <select [(ngModel)]="type">
      <option value="customer">Customer</option>
      <option value="vehicle">Vehicle</option>
    </select>

    <form (ngSubmit)="register()">
      <div *ngIf="type==='customer'">
        <input [(ngModel)]="customer.cust_name" name="name" placeholder="Name" required>
        <input [(ngModel)]="customer.phone_no" name="phone" placeholder="Phone no" required>
        <input [(ngModel)]="customer.license_no" name="license"  placeholder="License no " required>
         <input [(ngModel)]="customer.cust_adhaar" name="cust_adhaar" placeholder="Enter the Password" required>
        

      </div>

      <div *ngIf="type==='vehicle'">
        <input [(ngModel)]="vehicle.vehicle_model" name="model" placeholder="Model" required>
        <input [(ngModel)]="vehicle.vehicle_type" name="type" placeholder="Type" required>
         <input [(ngModel)]="vehicle.rc_no" name="type" placeholder="Registered Number" required>
        <input [(ngModel)]="vehicle.seats" name="seats" type="number" placeholder="Seats" required>
        <input [(ngModel)]="vehicle.price" name="price" type="number" placeholder="Price" required>

      </div>

      <button type="submit">Register</button>
    </form>
  `
})
export class RegisterComponent {
  type: 'customer' | 'vehicle' = 'customer';

  customer = { cust_name: '', phone_no: '', pass: '' ,license_no:'',cust_adhaar:''};
  vehicle = { vehicle_model: '', vehicle_type: '', rc_no:'',seats: 0, price: 0 };

  constructor(private api: ApiService,private router:Router) {}

  register() {
    if (this.type === 'customer') {
      this.api.registerCustomer(this.customer).subscribe(() => alert('Customer registered!'));
      this.router.navigate(['/Home']);
    } else {
      this.api.registerVehicle(this.vehicle).subscribe(() => alert('Vehicle registered!'));
            this.router.navigate(['/rentals']);
    }
  }
}
