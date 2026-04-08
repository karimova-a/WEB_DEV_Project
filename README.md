# MoodFlix - Movies by Mood

*"You don’t choose a movie - your mood chooses it."*

#Project Overview

**MoodFlix** is a full-stack web application that helps users discover, track, and review movies based on their mood. The system allows users to select their current mood and instantly receive personalized movie recommendations. Users can manage their watchlist, rate movies, write reviews, and interact with friends.

#Team Members

* **Karimova Aigerim** — ID: 24B031834
* **Kaldanova Lina** — ID: 24B031829
* **Baktygerey Kamshat** — ID: 24B031679

# Project Goals

The main goal of this project is to build a full-stack web application that demonstrates:

* Frontend–backend interaction via REST API
* User authentication with JWT
* CRUD operations for managing movies and user data
* Mood-based recommendation logic
* Clean and user-friendly UI

# Tech Stack

# Frontend

* Angular 17+ (TypeScript)
* HTML, CSS
* Angular Router
* HttpClient

# Backend

* Django
* Django REST Framework (DRF)

# Database

* SQLite (development)
* PostgreSQL (optional)

# Authentication

* JWT (JSON Web Token)

#Core Features

#Mood-Based Movie Selection

* Interactive mood picker on the homepage

* Choose your mode of the day:

  * Waking up
  * On the road
  * Working
  * Resting
  * Falling asleep

* Choose your mood:

  * Energetic
  * Cheerful
  * Calm
  * Sad
  * Mysterious

* Animated interface with smooth transitions

* Instant movie recommendations based on selected mood

#Movie Catalog

* Grid of movie cards with:

  * Poster
  * Title
  * Year

* Hover effects displaying:

  * Rating
  * Genre
  * Mood tag
  * "Add to list" button

* Hero banner / slider with:

  * New releases
  * Mood-based popular movies

* Horizontal shelves:

  * Top of the week
  * For a good mood
  * For the evening


# Authentication

* User registration:

  * Name
  * Email
  * Password

* Login with JWT token

* Optional login directly from the homepage
* 
# Social Features

* "What your friends are watching" block
* Real-time activity of subscriptions
* "You recently watched" viewing history
* Follow other users
* Friends activity feed:

  * Added to list
  * Rated a movie
  * Wrote a review

# Personalized Recommendations

* Mood-based matching:

  * Happy → Comedy / Romance
  * Sad → Drama
  * Excited → Action / Thriller

* Mood history with daily chart

* "You might also like" recommendations

# Watchlist Management

Users can manage movies using three statuses:

* Planned
* Watching now
* Completed

Features:

* One-click status change
* Filter and sort watchlist
* Status counters on profile page


#Reviews & Ratings

* Rate movies from **1 to 5 stars**
* Write and edit text reviews
* Average rating displayed on movie cards
* Recent reviews feed on movie page


#Personal Profile

* Avatar

* Name

* Statistics:

  * Watched
  * Watching
  * Planned

* Favorite genres

* Dominant mood (based on history)

* Followers & following lists

* Logout button (clears JWT)


# Repository

GitHub Repository:

[https://github.com/karimova-a/WEB_DEV_Project](https://github.com/karimova-a/WEB_DEV_Project)


# Project Idea

*MoodFlix* changes the way people choose movies. Instead of searching endlessly, users simply select their mood - and the system recommends the perfect movie instantly.

