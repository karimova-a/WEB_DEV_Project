import random
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Genre, Movie, WatchlistItem, MoodEntry, UserProfile
from .serializers import (
    GenreSerializer, MovieSerializer, WatchlistItemSerializer,
    MoodEntrySerializer, RegisterSerializer, MoodRecommendationSerializer,
    UserProfileSerializer
)

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

# ========== Function-Based Views (2+) ==========

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """FBV 1: User registration"""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'User registered successfully',
            'user': {'id': user.id, 'username': user.username, 'email': user.email}
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mood_recommend_view(request):
    """FBV 2: Get movie recommendations based on mood"""
    serializer = MoodRecommendationSerializer(data=request.data)
    if serializer.is_valid():
        mood = serializer.validated_data['mood']
        genre_names = MOOD_TO_GENRES.get(mood, ['Drama'])
        movies = Movie.objects.filter(genre__name__in=genre_names)
        movie_list = list(movies)
        random.shuffle(movie_list)
        recommended = movie_list[:5]

        # Save mood entry
        rec_movie = recommended[0] if recommended else None
        MoodEntry.objects.create(
            user=request.user,
            mood=mood,
            note=serializer.validated_data.get('mode', ''),
            recommended_movie=rec_movie
        )

        return Response({
            'mood': mood,
            'recommendations': MovieSerializer(recommended, many=True).data
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def genre_list_view(request):
    """FBV 3: List all genres"""
    genres = Genre.objects.all()
    return Response(GenreSerializer(genres, many=True).data)



