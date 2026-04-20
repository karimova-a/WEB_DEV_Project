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
})
