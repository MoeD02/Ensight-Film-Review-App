from django.contrib.auth import get_user_model, authenticate

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import *


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "following",
            "followers",
        )
        # read_only_fields = ("user",)

    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowersSerializer(obj.followers.all(), many=True).data


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")

        fields = ("id", "username", "email", "password")

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    username = serializers.CharField(
        min_length=1,
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = serializers.CharField(
        write_only=True,
    )


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        write_only=True,
    )


    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
    favorites = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    watchlist = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user = serializers.CharField(source="user.username")


class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = (
            "id",
            "following_user_id",
            "created",
        )


class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            "id",
            "user_id",
            "created",
        )


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"

        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
#    genres = serializers.StringRelatedField(many=True)


    class Meta:
        model = Movie
#        fields = "__all__"
        fields = ["id", "title", "poster_path", "release_date", "rating_average"]

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

        fields = "__all__"


class MovieListSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = MovieList
        fields = "__all__"

    author = serializers.CharField(source="author.username")


class CreateMovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieList
        fields = ["author", "title", "description"]


class MovieListThroughSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieListThrough
        fields = "__all__"
