from django.db import models
from django.conf import settings
from django.db.models.signals import post_save


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='profile',
    )
    
    followers = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=False,
        related_name = 'follow_from',
    )
    
    following = models.ManyToManyField(
        'self',
        blank=True,
        symmetrical=False,
        related_name = 'followed_by',
    )
    
    avatar = models.FileField(default='placeholder.jpg', upload_to='avatars/')
    bio = models.TextField(blank=True)
    
    def __str__(self):
        return self.user.username

def create_profile(sender, instance, created, **kwargs):
    if created:
        user_profile = Profile(user=instance)
        user_profile.save()
    
post_save.connect(create_profile, sender=settings.AUTH_USER_MODEL)


class Genre(models.Model):
    name = models.CharField(max_length=64)


class Movie(models.Model):
    title = models.CharField(max_length=256)
    poster_path = models.FileField(
        upload_to='posters/',
    )  # uploads to MEDIA_ROOT/posters/
    release_date = models.DateField()
    genres = models.ManyToManyField(
        Genre,
        related_name='genres',
    )
    description = models.CharField(max_length=1024)
    rating_count = models.PositiveIntegerField(default=0)
    
    rating_average = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
    )
    
    def __str__(self):
        return self.title


class Review(models.Model):
    title = models.CharField(max_length=512)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)
    
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reviews',
    )
    
    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        related_name='reviews',
    )

    RATING_CHOICES = [
        (5.0, '5'),
        (4.5, '4.5'),
        (4.0, '4'),
        (3.5, '3.5'),
        (3.0, '3'),
        (2.5, '2.5'),
        (2.0, '2'),
        (1.5, '1.5'),
        (1.0, '1'),
        (0.5, '0.5'),
        (0.0, '0'),
    ]
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        choices=RATING_CHOICES,
    )
    
    def __str__(self):
        return self.title
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['author', 'movie'],
                name='unique_review',
            ),
        ]


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='comments_by',
    )
    
    review = models.ForeignKey(
        Review,
        on_delete=models.CASCADE,
        related_name='comments',
    )
    
    reply_to = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        related_name='replies',
    )
    
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)


class MovieList(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='lists',
    )
    
    movies = models.ManyToManyField(
        Movie,
        through='MovieListThrough',
        related_name='lists',
    )
    
    title = models.CharField(max_length=512)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)


class MovieListThrough(models.Model):
    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
    )
    
    movie_list = models.ForeignKey(
        MovieList,
        on_delete=models.CASCADE,
    )
    
    date_added = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['movie', 'movie_list'],
                name='unique_movie_in_list',
            )
        ]