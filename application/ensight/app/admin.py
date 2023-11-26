from django.contrib import admin
from .models import *

class MovieAdmin(admin.ModelAdmin):
    list_display = ['title', ]
admin.site.register(Movie, MovieAdmin)

class ReviewAdmin(admin.ModelAdmin):
    list_display = ['author', 'movie', 'title', 'created_at']
admin.site.register(Review, ReviewAdmin)
class MovieInline(admin.TabularInline):
    model = MovieList.movies.through
    extra = 1  # Number of empty forms to display

class MovieListAdmin(admin.ModelAdmin):
    list_display = ['author', 'display_movies', 'title']

    def display_movies(self, obj):
        return ", ".join([movie.title for movie in obj.movies.all()])

    inlines = [MovieInline]

admin.site.register(MovieList, MovieListAdmin)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'bio']  # Define which fields to display in the admin list view
    list_filter = ['user']  # Optionally, add filters to the admin list view
    search_fields = ['user__username']  # Optionally, add search functionality by a related field

# Register the Profile model with the ProfileAdmin class
admin.site.register(Profile, ProfileAdmin)

class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
admin.site.register(Genre, GenreAdmin)