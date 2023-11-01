from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password


UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel,
        fields = '__all__'
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(
            username=clean_data['username'],
            email=clean_data['email'],
            password=clean_data['password']
            )
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def authenticate_user(self, clean_data):
        user = authenticate(
            username=clean_data['username'],
            password=clean_data['password'],
            )
        if not user:
            raise serializers.ValidationError('Could not authenticate user')
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'email')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

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
    class Meta:
        model = MovieList
        fields = '__all__'

class MovieListThroughSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieListThrough
        fields = '__all__'
