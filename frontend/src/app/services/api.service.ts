import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  poster_url: string;
  release_date: string;
  rating_imdb:number;
  description: string;
  genre: string;
  genre_name: string;
  genre_mood_tags: string;
  average_rating: number;
  trailer_url?: string;
  reviews?:any[];
}
export interface WatchListItem {
  id: number;
  movie: number;
  movie_detail: Movie;
  status: string;
  user_rating: number | null;
  review: string;
  created_at: string;
  updated_at: string;
}
export interface MoodEntry {
  id: number;
  mood: string;
  note: string;
  recommended_movie_detail: Movie | null;
  created_at: string;
}
export interface UserProfile{
  id: number;
  username: string;
  email: string;
  avatar: string;
  preferred_genres: string;
  watchlist_stats: { planned: number; watching: number; completed: number };
  follower_count: number;
  following_count: number;
}
