import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router ,NavigationEnd} from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
   @if(!isLandingPage){
    <nav class="nav">
      <a routerLink="/Home" routerLinkActive="active">Home</a>
      <a routerLink="/booking" routerLinkActive="active">Booking</a>
      <a routerLink="/profile" routerLinkActive="active">Profile</a>
      <a routerLink="" routerLinkActive="active">Logout</a>
    </nav>
   }
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    @if (toast()) {
      <div class="toast">{{ toast() }}</div>
    }
  `
})
export class AppComponent {
  toast = signal<string | null>(null);
  isLandingPage = false;

   constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(event => {
        const hiddenRoutes = ['/', '/landing', '/login', '/register','/rentals'];
        this.isLandingPage = hiddenRoutes.includes(event.urlAfterRedirects);
      });
    }
    }
