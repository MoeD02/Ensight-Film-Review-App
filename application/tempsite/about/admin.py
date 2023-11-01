from django.contrib import admin
from .models import Movie, Review
# Register your models here.

class MovieAdmin(admin.ModelAdmin):
  list_display = ["title", "release_date"]

admin.site.register(Movie, MovieAdmin)

class ReviewAdmin(admin.ModelAdmin):
  list_display = ["author", "movie", "title", "created_at"]
admin.site.register(Review, ReviewAdmin)