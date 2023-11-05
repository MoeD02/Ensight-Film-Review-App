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
from django.db.models import Q
class HomeView(TemplateView):
    template_name = 'app/home.html'



@api_view(['POST'])
def search_movies(request):
    if request.method == 'POST':
        search_query = request.data.get('content')  # Get the search query from the request data
        print(f"Search Query: {search_query}")

        # Search for movies that match the query in their title or description
        search_results = Movie.objects.filter(Q(title__icontains=search_query))

        
        # Serialize the search results
        serializer = MovieSerializer(search_results, many=True)

        return Response(serializer.data)


#This allows users to create a list with whatever movies they want
@api_view(['POST'])
def create_movie_list(request):
    if request.method == 'POST':
        serializer = CreateMovieListSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new movie list
            movie_list=serializer.save()
            movie_ids = request.data.get('movie_ids',[])
            for movie_id in movie_ids:
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
def test_fetch_first_movie(request):
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