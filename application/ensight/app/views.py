from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import *
from .forms import SearchForm
from .models import *

User = get_user_model()

class UserCreate(APIView):
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HomeView(TemplateView):
    template_name = 'app/home.html'

def home(request):
    movie_list = Movie.objects.order_by('-release_date')[:10]
    return render(request, 'app/home.html', {'movie_list': movie_list})

def search(request):
    if request.method == 'GET':
        form = SearchForm(request.GET)
        if form.is_valid():
            query = form.cleaned_data['query']
            search_type = form.cleaned_data['search_type']
            
            if search_type == 'movie':
                results = Movie.objects.filter(title__icontains=query)
            elif search_type == 'user':
                results = Review.objects.filter(author__username__icontains=query)
            
            return render(request, 'app/home.html', {'results': results, 'search_type':search_type, 'form': form})
    else:
        form = SearchForm()
    
    return render(request, 'app/home.html', {'form': form})