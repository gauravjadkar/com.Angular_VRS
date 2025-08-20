import { Routes } from '@angular/router';
import { HomeComponent } from './app/pages/home.component';
import { BookingComponent } from './app/pages/booking.component';
import { ProfileComponent } from './app/pages/profile.component';
import { RegisterComponent } from './app/pages/registration.component';
import { LoginComponent } from './app/pages/login.component';
import { LandingComponent } from './app/pages/landing.component';
import {  Rentals } from './app/pages/rentals.component';
export const routes: Routes = [
  { path:'',component:LandingComponent},
  { path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path: 'Home', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'rentals', component:Rentals},
  { path: '**', redirectTo: '' }
];  