from django.contrib import admin
from .models import *

class MovieAdmin(admin.ModelAdmin):
    list_display = ['title', 'release_date']
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

    