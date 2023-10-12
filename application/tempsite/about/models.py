from django.db import models
from django.conf import settings

class Movie(models.Model):
  title = models.CharField(max_length=256)
  release_date = models.DateField()
  description = models.CharField(max_length=1024)
  rating_count = models.PositiveSmallIntegerField(default=0)
  rating_average = models.DecimalField(max_digits=3, decimal_places=2, default=0)
  poster_path = models.FileField(upload_to='posters/') # uploads to MEDIA_ROOT/posters/
  
  def __str__(self):
    return self.title

class Review(models.Model):
  # related_name allows you to reverse lookup the relation, e.g. Movie.reviews.all() gets all reviews for that movie
  # TODO: reverse lookup on user may need different syntax due to nature of django built-in user model
  author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
  movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
  title = models.CharField(max_length=512)
  RATING_CHOICES = [
    (5.0, "5"),
    (4.5, "4.5"),
    (4.0, "4"),
    (3.5, "3.5"),
    (3.0, "3"),
    (2.5, "2.5"),
    (2.0, "2"),
    (1.5, "1.5"),
    (1.0, "1"),
    (0.5, "0.5"),
    (0.0, "0"),
  ]
  rating = models.DecimalField(
    max_digits=2,
    decimal_places=1,
    choices=RATING_CHOICES,
    )
  text = models.TextField(blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return self.title

class Comment(models.Model):
  author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
  review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='comments')
  text = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  
  
class MovieList(models.Model):
  author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lists')
  movies = models.ManyToManyField(Movie)
  title = models.CharField(max_length=512)
  description = models.TextField(blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  
