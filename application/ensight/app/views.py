from django.shortcuts import render
from django.views.generic.base import TemplateView
from .forms import SearchForm
from .models import *
from django.http import JsonResponse
from .serializers import*
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
class HomeView(TemplateView):
    template_name = 'app/home.html'

@api_view(['POST'])
def create_movie_list(request):
    if request.method == 'POST':
        serializer = CreateMovieListSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new movie list
            movie_list=serializer.save()
            movie_id = request.data.get('movie_id')
            movie = Movie.objects.get(pk=movie_id)
            MovieListThrough.objects.create(movie=movie, movie_list=movie_list)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#fetch username, user's bio and user's privacy status
#def getUserInfo(request):
    

#get's user's list(all of it). STILL NEEDS WORK because it doesn't know which user it is
def get_all_user_list(request):
    movie_list = MovieList.objects.all()
    serializer = MovieListSerializer(movie_list, many=True)
    return JsonResponse(serializer.data, safe=False)

#fetches first movie
def test_fetch(request):
    movie = Movie.objects.first() 

    serializer = MovieSerializer(movie)

    return JsonResponse(serializer.data)





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