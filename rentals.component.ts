import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Vehicle } from '../models';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [CommonModule,DatePipe,FormsModule],
  template: `
   <p>Vehicle Details</p>
    <form (ngSubmit)="vehicle_load()">
        <div class="form-row">
          <div>
            <label>Vehicle ID</label>
            <input type="number" [(ngModel)]="id" name="id" required>
          </div>
          <div style="align-self:end;">
            <button class="btn primary" type="submit">Load</button>
          </div>
        </div>
      </form>
      @if (vehicle) {
        <div style="margin-top:.75rem;" >
          <p><b>ID          :</b> {{ vehicle!.vehicle_id }}</p>
          <p><b>Model       :</b> {{ vehicle!.vehicle_model }}</p>
          <p><b>Type        :</b> {{vehicle!.vehicle_type}}</p>
          <p><b>Seats       :</b> {{vehicle!.seats}}</p>
          <p><b>Price       :</b> {{vehicle!.price}}</p>
          <p><b>Rc no       :</b> {{vehicle!.rc_no}}</p>
        </div>
      }   
  
  <div class="history-container">
    <h2>Vehicle Rental History</h2>

    @if (loading) {
      <div>Loading...</div>
    }

    @if (error) {
      <div class="error">{{ error }}</div>
    }

    @if (history.length > 0) {
      <table class="history-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Rent Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          @for (h of history; track h) {
            <tr>
              <td>{{ h.cust_name }}</td>
              <td>{{ h.rentdate | date:'mediumDate' }}</td>
              <td>{{ h.returndate | date:'mediumDate' }}</td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <p>No rental history found for this vehicle.</p>
    }
  </div>
  `,
  styles: [`
    .history-container {
      padding: 20px;
    }

    .history-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }

    .history-table th,
    .history-table td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }

    .history-table th {
      background: #f4f4f4;
    }
    .error {
      color: red;
      margin: 10px 0;
    }
  `]
})
export class Rentals implements OnInit {

  history: { cust_name: string, rentdate: string, returndate: string }[] = [];
  vehicle_id: number | null = null;
  id:number | null= null;
  loading = false;
  error: string | null = null;
  vehicle:Vehicle | null=null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    const id = localStorage.getItem("vehicle_id");
    if (id) {
      this.vehicle_id = Number(id);
      
      this.fetchHistory();
    } else {
      this.error = "Vehicle ID not found. Please login as Vehicle.";
    }
  }

  fetchHistory() {
    if (!this.vehicle_id) return;
  
    this.loading = true;
    this.api.getRentalHistoryByVehicle(this.vehicle_id).subscribe({
      next: (res) => {                                
        this.history = res;
        this.loading = false;
      },
      error: () => {
        this.error = "Failed to load rental history.";
        this.loading = false;
      }
    });
  }
  vehicle_load()
  {
    if(!this.vehicle_id) return;
     this.api.getVehicle(this.vehicle_id).subscribe(v=>this.vehicle=v);  }
  
}
