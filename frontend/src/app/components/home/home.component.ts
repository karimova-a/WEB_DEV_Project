import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Movie } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, SlicePipe],
  template: `
    <div class="page">
      <section class="hero">
        <h1>You don't choose a movie <br><span class="highlight">your mood chooses it.</span></h1>
        <p>Select your mood and get instant movie recommendations</p>
      </section>

      <section class="mood-section">
        <h2>How are you feeling?</h2>
        <div class="mood-grid">
          @for (m of moods; track m.key) {
            <button
              class="mood-card"
              [class.selected]="selectedMood === m.key"
              (click)="selectMood(m.key)">
              <span class="mood-emoji">{{ m.emoji }}</span>
              <span class="mood-label">{{ m.label }}</span>
            </button>
          }
        </div>

        @if (selectedMood && !isLoggedIn) {
          <div class="login-prompt">
            <p>Please <a routerLink="/login">log in</a> to get personalized recommendations!</p>
          </div>
        }

        @if (loading) {
          <div class="loading">Finding perfect movies for you...</div>
        }

        @if (recommendations.length > 0) {
          <h2 class="rec-title">Recommended for your mood: <span class="highlight">{{ selectedMood }}</span></h2>
          <div class="movie-grid">
            @for (movie of recommendations; track movie.id) {
              <a [routerLink]="['/movies', movie.id]" class="movie-card">
                <div class="poster-wrap">
                  <img [src]="movie.poster_url" [alt]="movie.title" class="poster"
                       (error)="onImgError($event)"/>
                  <div class="poster-overlay">
                    <span class="rating">⭐ {{ movie.rating_imdb }}</span>
                    @if (movie.genre_name) {
                      <span class="genre-tag">{{ movie.genre_name }}</span>
                    }
                  </div>
                </div>
                <h3 class="movie-title">{{ movie.title }}</h3>
                <p class="movie-year">{{ movie.release_date | slice:0:4 }}</p>
              </a>
            }
          </div>
        }

        @if (error) {
          <div class="error-msg">{{ error }}</div>
        }
      </section>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .page {
      min-height: 100vh;
      background: #000000;
      color: #ffffff;
      font-family: 'Segoe UI', 'Poppins', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
    }

    /* HERO */
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

    .rec-title {
      text-align: center;
      font-size: 1.8rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 2.5rem;
    }

    .movie-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 2rem;
    }

    .movie-card {
      text-decoration: none;
      color: #ffffff;
      transition: transform 0.3s ease;
    }

    .movie-card:hover {
      transform: translateY(-8px);
    }

    .poster-wrap {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      aspect-ratio: 2/3;
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    }

    .poster {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .movie-card:hover .poster {
      transform: scale(1.05);
    }

    .poster-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
    }

    .rating {
      font-size: 1rem;
      font-weight: 700;
      color: #ffd200;
    }

    .genre-tag {
      font-size: 0.85rem;
      background: rgba(247, 151, 30, 0.25);
      color: #f7971e;
      padding: 0.25rem 0.65rem;
      border-radius: 12px;
      font-weight: 500;
    }

    .movie-title {
      font-size: 1.05rem;
      font-weight: 600;
      margin-top: 0.75rem;
      line-height: 1.4;
      color: #ffffff;
    }

    .movie-year {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 0.25rem;
    }

    .loading {
      text-align: center;
      color: #ffd200;
      padding: 3rem;
      font-size: 1.3rem;
      font-weight: 500;
    }

    .error-msg {
      text-align: center;
      color: #ff6b6b;
      padding: 2rem;
      font-size: 1.1rem;
    }

    .login-prompt {
      text-align: center;
      padding: 2rem;
      color: rgba(255, 255, 255, 0.7);
      font-size: 1.1rem;
    }

    .login-prompt a {
      color: #ffd200;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 2px solid #ffd200;
      transition: all 0.2s;
    }

    .login-prompt a:hover {
      color: #f7971e;
      border-bottom-color: #f7971e;
    }

    @media (max-width: 1200px) {
      .movie-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
      }

      .hero h1 {
        font-size: 4rem;
      }
    }

    @media (max-width: 992px) {
      .movie-grid {
        grid-template-columns: repeat(3, 1fr);
      }

      .mood-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .hero h1 {
        font-size: 3rem;
      }
    }

    @media (max-width: 768px) {
      .movie-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .mood-section {
        padding: 2rem 1.5rem;
      }

      .hero h1 {
        font-size: 2.5rem;
      }
    }
  `]
})
export class HomeComponent {
  private api: ApiService = inject(ApiService);
  private auth: AuthService = inject(AuthService);
  moods = [
    { key: 'happy',      emoji: '😊', label: 'Happy' },
    { key: 'sad',        emoji: '😢', label: 'Sad' },
    { key: 'excited',    emoji: '🤩', label: 'Excited' },
    { key: 'chill',      emoji: '😌', label: 'Chill' },
    { key: 'romantic',   emoji: '🥰', label: 'Romantic' },
    { key: 'energetic',  emoji: '⚡', label: 'Energetic' },
    { key: 'mysterious', emoji: '🔮', label: 'Mysterious' },
    { key: 'calm',       emoji: '🧘', label: 'Calm' },
  ];
  selectedMood = '';
  recommendations: Movie[] = [];
  loading = false;
  error = '';
  isLoggedIn = false;
  constructor() {
    this.isLoggedIn = this.auth.isLoggedIn();

  }
  selectMood(mood: string) {
    this.selectedMood = mood;
    if (!this.auth.isLoggedIn()) return;
    this.loading = true;
    this.error = '';
    this.recommendations = [];
    this.api.getMoodRecommendations(mood).subscribe({
      next: res => { this.recommendations = res.recommendations; this.loading = false; },
      error: () => { this.error = 'Failed to get recommendations. Please try again.'; this.loading = false; }
    });
  }
  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+Poster';
  }

}
