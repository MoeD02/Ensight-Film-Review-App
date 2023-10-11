from django.db import models
from django.conf import settings

class Movie(models.Model):
  title = models.CharField(max_length=256)
  release_date = models.DateField()
  description = models.CharField(max_length=1024)
  rating_count = models.PositiveSmallIntegerField(default=0)
  rating_average = models.DecimalField(max_digits=3, decimal_places=2, default=0)
  poster_path = models.FilePathField(path=settings.BASE_DIR / 'about/static/about/posters', match=None)
  
  def __str__(self):
    return self.title

class Review(models.Model):
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