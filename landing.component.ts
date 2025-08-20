import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  template: `
    <div class="landing">
      <div class="card">
        <h1>Welcome to RentRover</h1>
        <div class="buttons">
          <button class="btn register" (click)="goRegister()">Register</button>
          <button class="btn login" (click)="goLogin()">Login</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    
    .landing {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background:;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .card {
      background: rgba(255, 255, 255, 0.95);
      padding: 3rem 4rem;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      text-align: center;
      max-width: 400px;
      width: 90%;
      transition: transform 0.3s ease;
      
    }
    .card:hover {
      transform: translateY(-10px);
    }
    h1 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 2rem;
    }
    .buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn {
      padding: 12px 25px;
      font-size: 1rem;
      border-radius: 50px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: bold;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .btn.register {
      background: #ff6b6b;
      color: white;
    }
    .btn.register:hover {
      background: #ff4757;
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }

    .btn.login {
      background: #1dd1a1;
      color: white;
    }
    .btn.login:hover {
      background: #10ac84;
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
    @media (max-width: 500px) {
      .card {
        padding: 2rem 2rem;
      }
      .buttons {
        flex-direction: column;
      }
      .btn {
        width: 100%;
      }
    }
  `]
})
export class LandingComponent {
  constructor(private router: Router) {}
  goRegister() { this.router.navigate(['/register']); }
  goLogin() { this.router.navigate(['/login']); }
}
