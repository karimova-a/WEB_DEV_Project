import random
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Genre, Movie, WatchlistItem, MoodEntry, UserProfile


MOOD_TO_GENRES = {
    'happy': ['Comedy', 'Adventure', 'Animation'],
    'sad': ['Drama', 'Romance'],
    'excited': ['Action', 'Thriller', 'Sci-Fi'],
    'chill': ['Documentary', 'Indie', 'Animation'],
    'romantic': ['Romance', 'Drama'],
    'energetic': ['Action', 'Adventure', 'Comedy'],
    'mysterious': ['Thriller', 'Horror', 'Sci-Fi'],
    'calm': ['Documentary', 'Indie', 'Drama'],
}


