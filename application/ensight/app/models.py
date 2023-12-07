from django.db import models
from django.conf import settings
from django.db.models.signals import post_save


class UserFollowing(models.Model):
    user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="following",
        on_delete=models.CASCADE,
    )
    following_user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="followers",
        on_delete=models.CASCADE,
    )
    created = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user_id", "following_user_id"],
                name="unique_followers",
            ),
            models.CheckConstraint(
                check=~models.Q(
                    user_id=models.F("following_user_id"),
                ),
                name="not_same_user",
            ),
        ]
        indexes = [
            models.Index(
                fields=["created"],
                name="created_idx",
            ),
        ]
        ordering = ["-created"]


class Genre(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=256)
    poster_path = models.CharField(
        max_length=128,
        null=True,
    )
    backdrop_path = models.CharField(
        max_length=128,
        null=True,
    )
    trailer_path = models.CharField(
        max_length=128,
        null=True,
    )
    release_date = models.DateField(
        null=True,
        blank=True,
        default=None,
    )
    genres = models.ManyToManyField(
        Genre,
        blank=True,
        related_name="movies",
    )
    description = models.TextField(blank=True)
    runtime = models.PositiveSmallIntegerField(null=True)
    rating_count = models.PositiveIntegerField(default=0)
    rating_average = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
    )
    popularity = models.DecimalField(
        null=True,
        decimal_places=4,
        max_digits=10,
    )

    def __str__(self):
        return self.title

    class Meta:
        indexes = [
            models.Index(
                fields=["title"],
                name="title_idx",
            ),
            models.Index(
                fields=["popularity"],
                name="popularity_idx",
            ),
        ]


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
        null=True,
    )
    favorites = models.ManyToManyField(
        Movie,
        blank=True,
        related_name="favorited_by",  # Updated related_name
    )
    watchlist = models.ManyToManyField(
        Movie,
        blank=True,
        related_name="watchlisted_profiles",
    )

    avatar = models.FileField(default="placeholder.png", upload_to="")
    bio = models.TextField(blank=True)


def create_profile(sender, instance, created, **kwargs):
    if created:
        user_profile = Profile(user=instance)
        user_profile.save()


post_save.connect(create_profile, sender=settings.AUTH_USER_MODEL)


class Person(models.Model):
    name = models.CharField(max_length=128)
    profile_path = models.CharField(max_length=128, null=True)
    biography = models.TextField(null=True)
    known_for = models.CharField(max_length=64, null=True)
    popularity = models.DecimalField(null=True, decimal_places=3, max_digits=10)


class CreditList(models.Model):
    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        related_name="credits",
    )
    person = models.ForeignKey(
        Person,
        on_delete=models.CASCADE,
        related_name="credited_in",
    )
    job = models.CharField(
        max_length=128,
    )
    role = models.CharField(
        max_length=128,
        null=True,
        default=None,
    )


class Review(models.Model):
    # title = models.CharField(max_length=512)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reviews",
    )
    movie = models.ForeignKey(
        Movie,
        on_delete=models.CASCADE,
        related_name="reviews",
    )
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
        null=True,
    )

    def __str__(self):
        return self.title

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["author", "movie"],
                name="unique_review",
            ),
        ]


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="comments_by",
    )
    review = models.ForeignKey(
        Review,
        on_delete=models.CASCADE,
        related_name="comments",
    )
    reply_to = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        related_name="replies",
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)


class MovieList(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="lists",
    )
    movies = models.ManyToManyField(
        Movie,
        through="MovieListThrough",
        related_name="lists",
    )
    title = models.CharField(max_length=256)
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
                fields=["movie", "movie_list"],
                name="unique_movie_in_list",
            )
        ]
