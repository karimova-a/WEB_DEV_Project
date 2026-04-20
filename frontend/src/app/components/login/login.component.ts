import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service.ts';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-sub">Log in to your MoodFlix account</p>

        <div class="form-group">
          <label>Username</label>
          <input type="text" [(ngModel)]="username" placeholder="Enter username" class="input" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" placeholder="Enter password" class="input" />
        </div>

        @if (error) { <p class="error">{{ error }}</p> }

        <button class="btn-primary" (click)="onLogin()" [disabled]="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <p class="switch-link">Don't have an account? <a routerLink="/register">Register</a></p>
      </div>
    </div>
  `
})