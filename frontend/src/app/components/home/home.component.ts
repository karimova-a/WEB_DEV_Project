import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Movie } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports :[FormsModule, RouterLink,SlicePipe],
  template:`
    <div class="page">
      <section class="hero">
        <h1>You don't choose a movie<br><span class="highlight">your mood chooses it</span></h1>
        <p>Select your mood and get instant movie recommendations</p>
      </section>
      <section class="mood-section">
        <h2>How are you feeling?</h2>
        <div class="mood-grid">
          @for (m of moods;track m.key){
            <button
              class="mood-card"
              [class.selected]="selectedMood == m.key"
              (click)="selectMood(m.key)">
            ><span class="mood-emoji">{{m.emoji}}</span>
              <span class="mood-label">{{m.label}}</span>
            </button>
          }
        </div>
        @if (selectedMood && !isLoggedIn){
          <div class="login-prompt">
            <p>Please<a routerLink="/login">login</a>to get personalized recommendations!</p>
          </div>
        }
        @if (recommendations.length > 0) {
          <h2 class="rec-title">Recommended for your mood: <span class="highlight">{{ selectedMood }}</span></h2>
          <div class="movie-grid">
            @for (movie of recommendations; track movie.id){
              <a [routerLink]="['/movies',movies.id]" class="movie-card">
                <div class="poster-wrap">
                  <img [src]="movie.poster_url" [alt]="movie.title" class="poster"
                       (error)="onImgError($event)"/>
                  <div class="poster-overlay">
                    <span class="rating">⭐{{movie.rating_imdb}}</span>
                    @if (movie.genre_name){
                      <span class="genre-tag">{{movie.genre_name}}</span>
                    }
                  </div>
                </div>
                <h3 class="movie-title">{{movie.title}}</h3>
                <p class="movie-year">{{movie.release_date |slice:0:4}}</p>
              </a>
            }

          </div>
        }
        @if(error){
          <div class="error-msg">{{error}}</div>
        }
      </section>
    </div>
  `,
  //дальше уже стили дописать надо
  styles:[
    `
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;

      }
      .page{
        min-height: 100vh;
        background: #0f0f0f;
        color: #ffffff;
        font-family: 'Segoe UI', 'Poppins', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
      }
      .hero {
        text-align: center;
        padding: 6rem 2rem 5rem;
        position: relative;
        overflow: hidden;
        background: #000000;
      }
      .hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 30% 70%, rgba(120, 50, 220, 0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 70% 30%, rgba(247, 151, 30, 0.05) 0%, transparent 60%);
        pointer-events: none;
      }
      .hero h1 {
        font-size: 5.5rem;
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: 1.5rem;
        position: relative;
        letter-spacing: -0.02em;
      }
      .highlight {
        background: linear-gradient(135deg, #fbf3e9, #ffffff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .hero p {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.4rem;
        position: relative;
        font-weight: 400;
      }
      .mood-section {
        padding: 3rem 4rem 5rem;
        background: #000000;
      }
      .mood-section h2 {
        text-align: center;
        font-size: 2.2rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 2rem;
      }
      .mood-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.8rem;
        width: 100%;
        max-width: 1100px;
        margin: 0 auto 3rem;
      }
      .mood-card {
        background: rgba(255, 255, 255, 0.03);
        border: 2px solid rgba(255, 255, 255, 0.08);
        border-radius: 28px;
        padding: 2.5rem 1.5rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.8rem;
        transition: all 0.3s ease;
        color: #ffffff;
      }
      .mood-card:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(247, 151, 30, 0.6);
        transform: translateY(-6px);
      }
      .mood-card.selected {
        background: rgba(247, 151, 30, 0.12);
        border-color: #f7971e;
        box-shadow: 0 0 32px rgba(247, 151, 30, 0.2);
      }
      .mood-emoji {
        font-size: 4rem;
      }
      .mood-label {
        font-size: 1.3rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        letter-spacing: 0.5px;
      }
      .mood-card.selected .mood-label {
        color: #ffd200;
      }







    `
  ]
})
