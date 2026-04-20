import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { ApiService, WatchlistItem } from '../../services/api.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [FormsModule, RouterLink, SlicePipe],
  template: `
    <div class="page">
      <h1 class="page-title">My Watchlist</h1>
      <div class="tabs">
        @for (tab of tabs; track tab.key) {
          <button class="tab" [class.active]="activeTab === tab.key"
                  (click)="filterByStatus(tab.key)">
            {{ tab.label }} ({{ getCount(tab.key) }})
          </button>
        }
      </div>

      @if (loading) {
        <div class="loading">Loading...</div>
      }

      @if (!loading && filteredItems.length === 0) {
        <div class="empty">No movies in this list yet.</div>
      }

      <div class="list">
        @for (item of filteredItems; track item.id) {
          <div class="watchlist-card">
            <a [routerLink]="['/movies', item.movie_detail.id]" class="card-poster">
              <img [src]="item.movie_detail.poster_url" [alt]="item.movie_detail.title"
                   (error)="onImgError($event)" />
            </a>
            <div class="card-info">
              <h3>{{ item.movie_detail.title }}</h3>
              <p class="card-meta">{{ item.movie_detail.genre_name }} · {{ item.movie_detail.release_date | slice:0:4 }}</p>
              <div class="card-actions">
                <select [(ngModel)]="item.status" (change)="updateStatus(item)" class="status-select">
                  <option value="planned"> Planned</option>
                  <option value="watching">▶Watching</option>
                  <option value="completed">Completed</option>
                </select>
                <div class="star-rating">
                  @for (s of [1,2,3,4,5]; track s) {
                    <button class="star" [class.filled]="(item.user_rating || 0) >= s"
                            (click)="rate(item, s)">★</button>
                  }
                </div>
                <button class="btn-remove" (click)="remove(item)">✕</button>
              </div>
              @if (item.review) {
                <p class="review-preview">{{ item.review }}</p>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  //тут тоже дописать надо стили
