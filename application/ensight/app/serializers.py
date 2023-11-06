from .models import *
from rest_framework import serializers

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
    user = serializers.CharField(source="user.username")
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class MovieListSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)
    class Meta:
        model = MovieList
        fields = '__all__'
    author = serializers.CharField(source="author.username") 
class CreateMovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieList
        fields = ['author', 'title', 'description']
class MovieListThroughSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieListThrough
        fields = '__all__'
