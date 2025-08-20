import { Component, inject, signal } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Vehicle, Rental } from '../models';

@Component({
  standalone: true,
  selector: 'app-booking',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card" style="margin-bottom:1rem;">
    <h2>Find Vehicles</h2>
    <form (ngSubmit)="search()">
      <div class="form-row">
        <div>
          <label>Rent date</label>
          <input type="date" [(ngModel)]="rent_date" name="rentdate" required />
        </div>
        <div>
          <label>Return date</label>
          <input type="date" [(ngModel)]="return_date" name="returndate" required />
        </div>
        <div>
          <label>Type</label>
          <select [(ngModel)]="vehicle_type" name="vehicletype">
            <option>sedan</option>
            <option>MPV</option>
            <option>Suv</option>
          </select>
        </div>
        <div style="align-self:end;">
          <button class="btn primary" type="submit">Search</button>
        </div>
      </div>
    </form>
  </div>

  @if (vehicles().length === 0) {
    <div class="card">No vehicles yet. Try searching.</div>
  } @else {
    <div class="grid">
      @for (v of vehicles(); track v.vehicle_id) {
        <div class="card">
          <h3 style="margin:.2rem 0;">{{ v.vehicle_model }}</h3>
          <div>Type: {{ v.vehicle_type }}</div>
          <div>Price: ₹{{ v.price }}</div>
          <div style="display:flex; gap:.5rem; margin-top:.5rem;">
            <button class="btn primary" (click)="promptBooking(v)">Book</button>
            <button class="btn ghost" (click)="addToWatchLater(v)">Watch later</button>
          </div>
        </div>
      }
    </div>
  }

  <dialog #dlg>
    <form method="dialog" class="card" style="width:min(520px, 92vw)">
      <h3>Confirm Booking</h3>
      @if (selected()) {
        <p>Vehicle: <b>{{ selected()?.vehicle_model }}</b></p>
        <p>Daily Price: ₹{{ selected()?.price }}</p>
      }

      <div class="form-row">
        <div>
          <label>Customer ID</label>
          <input type="number" [(ngModel)]="cust_id" name="custid" required />
        </div>
        <div>
          <label>Rent</label>
          <input type="date" [(ngModel)]="rent_date" name="rentdate2" required (change)="calculateTotal()" />
        </div>
        <div>
          <label>Return</label>
          <input type="date" [(ngModel)]="return_date" name="returndate2" required (change)="calculateTotal()" />
        </div>
      </div>

      @if (totalPrice > 0) {
        <p style="margin-top:.5rem;"><b>Total Price:</b> ₹{{ totalPrice }}</p>
      }

      <div style="display:flex; gap:.5rem; justify-content:flex-end; margin-top:1rem;">
        <button class="btn ghost" (click)="closeDialog(dlg)">Cancel</button>
        <button class="btn primary" (click)="confirmBooking(); closeDialog(dlg)">Confirm</button>
      </div>
    </form>
  </dialog>
  `
})
export class BookingComponent {
  private api = inject(ApiService);
  vehicles = signal<Vehicle[]>([]);
  rent_date = '';
  return_date = '';
  vehicle_type = '';
  selected = signal<Vehicle | null>(null);
  cust_id: number | null = null;
  totalPrice: number = 0;

  search() {
    if (!this.rent_date || !this.return_date) return;
    this.api.listAvailable(this.rent_date, this.return_date, this.vehicle_type || '')
      .subscribe(v => this.vehicles.set(v));
  }

  promptBooking(v: Vehicle) {
    this.selected.set(v);
    this.calculateTotal();
    (document.querySelector('dialog') as HTMLDialogElement)?.showModal();
  }

  closeDialog(dlg: HTMLDialogElement) { dlg.close(); }

  addToWatchLater(v: Vehicle) {
    const cid = this.cust_id ?? 1;
    this.api.addWatchLater({ cust_id: cid, vehicle_id: v.vehicle_id }).subscribe();
  }

  calculateTotal() {
    if (!this.rent_date || !this.return_date || !this.selected()) {
      this.totalPrice = 0;
      return;
    }
    const start = new Date(this.rent_date);
    const end = new Date(this.return_date);
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    if (diffDays > 0) {
      this.totalPrice = diffDays * (this.selected()?.price || 0);
    } else {
      this.totalPrice = 0;
    }
  }

  confirmBooking() {
    const v = this.selected();
    if (!v || !this.cust_id) return;

    const rental: Rental = {
      cust_id: this.cust_id,
      vehicle_id: v.vehicle_id,
      rentdate: formatDate(this.rent_date, 'yyyy-MM-dd', 'en-US'),
      returndate: formatDate(this.return_date, 'yyyy-MM-dd', 'en-US')
    };

    this.api.createRental(rental).subscribe({
      next: () => {
        alert("Booking successfully!");
      },
      error: () => {
        alert("Booking failed. Please try again.");
      }
    });
  }
}
