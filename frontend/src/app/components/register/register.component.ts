import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h1 class="auth-title">Join MoodFlix</h1>
        <p class="auth-sub">Create your account and start discovering movies</p>

        <div class="form-group">
          <label>Username</label>
          <input type="text" [(ngModel)]="username" placeholder="Choose a username" class="input" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" placeholder="your@email.com" class="input" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" placeholder="Min 6 characters" class="input" />
        </div>

        @if (error) { <p class="error">{{ error }}</p> }
        @if (success) { <p class="success">{{ success }}</p> }

        <button class="btn-primary" (click)="onRegister()" [disabled]="loading">
          {{ loading ? 'Creating...' : 'Register' }}
        </button>

        <p class="switch-link">Already have an account? <a routerLink="/login">Login</a></p>
      </div>
    </div>
  `
})