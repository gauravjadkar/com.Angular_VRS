import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="id" name="id" placeholder="Enter Registered Id" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Enter Password" required>
      <button type="submit">Submit</button>
    </form>
  `
})
export class LoginComponent {
  id: number=0;
  password: string = '';

  constructor(private api: ApiService, private router: Router) {}

  async login() {
    const role = await this.api.login(this.id, this.password);

    if (role === 'vehicle') {
      alert('Vehicle login successful!');
      this.router.navigate(['/rentals']);
    } else if (role === 'customer') {
      alert('Customer login successful!');
      this.router.navigate(['/Home']); 
    } else {
      alert('Invalid credentials!');
    }
  }
}


