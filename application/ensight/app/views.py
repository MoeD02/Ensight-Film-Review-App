from django.shortcuts import render
from django.views.generic.base import TemplateView

from .serializers import *
from .forms import SearchForm
from .models import *
from django.contrib.auth import get_user_model

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response

from knox.models import AuthToken

from .serializers import *

User = get_user_model()


class RegisterAPI(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'user':     serializer.data,
                'token':    'Token ' + AuthToken.objects.create(user)[1],
            })
        return Response({'errors': serializer.errors}, status.HTTP_400_BAD_REQUEST)


class LoginAPI(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data
            return Response ({
                'user':     UserSerializer(user).data,
                'token':    'Token ' + AuthToken.objects.create(user)[1],
            })
        return Response({'errors': 'Invalid Credentials'}, status.HTTP_400_BAD_REQUEST)


class CurrentUserAPI(RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user
from django.http import JsonResponse
from .serializers import*
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from django.db.models import Q
from django.contrib.auth import get_user_model

User = get_user_model()
class HomeView(TemplateView):
    template_name = 'app/home.html'


@api_view(['POST'])
def header_search(request):
    if request.method == 'POST':
        search_query = request.data.get('content')
        print("Search Query: ", search_query)
        movie_results =  Movie.objects.filter(Q(title__icontains=search_query))
        movie_serializer = MovieSerializer(movie_results, many=True)
    
        review_results =  Review.objects.filter(
            Q(title__icontains=search_query) |  # Search by title (case-insensitive)
            Q(text__icontains=search_query) |   # Search by text (case-insensitive)
            Q(author__username__icontains=search_query)  # Search by author's username (case-insensitive)
            # You can add more criteria based on your needs
        )
    
        reviews_serializer = ReviewSerializer(review_results, many=True)
    
        users_results = Profile.objects.filter(Q(user__username__icontains=search_query))
    
        user_serializer = ProfileSerializer(users_results,many=True)
    
        data = {
            'movies': movie_serializer.data,
            'reviews': reviews_serializer.data,
            'users': user_serializer.data,
        }
    
        return Response(data)


@api_view(['POST'])
def fetch_movies(request):
    filter = request.data.get('filter')
    genres = request.data.get('genres')
    years = request.data.get('years')
    years = increment_years(years)
    index = request.data['amount']

    movies = Movie.objects.all()
    if genres:
        movies = Movie.objects.filter(genres__name__in=genres).distinct()

    if years:
        movies = movies.filter(release_date__year__in=years)

    if filter == 'highest': 
        movies = movies.order_by('-rating_average')[:index]
    elif filter == 'ALL':
        movies = movies.all()
    elif filter == 'lowest':
        movies = movies.order_by('rating_average')[:index]
    serializer = MovieSerializer(movies, many=True)
    
    return Response(serializer.data)


@api_view(['POST'])
def search_movies(request):
    if request.method == 'POST':
        filter = request.data.get('filter')
        genres = request.data.get('genres')
        years = request.data.get('years')
        years = increment_years(years)
        search_query = request.data.get('content')  

        # Search for movies that match the query in their title or description
        search_results = Movie.objects.filter(Q(title__icontains=search_query))

        if years:
            search_results = search_results.filter(release_date__year__in=years)
        if genres:
            search_results = search_results.filter(genres__name__in=genres).distinct()
        else:
            search_results = search_results.all()
       
        if filter == 'highest':
            search_results = search_results.order_by('-rating_average')
        elif filter == 'lowest':
            search_results = search_results.order_by('rating_average')
        serializer = MovieSerializer(search_results, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def get_users(request):
    filter = request.data.get('filter')
    if filter == "ALL":
        users = Profile.objects.all()
        serializer = ProfileSerializer(users,many=True)
    else:
        index = request.data['amount']
        users = Profile.objects.all()[:index]
        serializer = ProfileSerializer(users,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def search_users(request):
    if request.method == 'POST':
        search_query = request.data.get('content')
        print(f"Search Query: {search_query}")
        users = Profile.objects.filter(
            Q(user__username__icontains=search_query))
        
        serializer = ProfileSerializer(users,many=True)
        user_profiles = [
            {
                'username': user.user.username,
             }
             for user in users
        ]
        return Response(serializer.data)
    # else:
    #     return JsonResponse({'error': 'Invalid request method'}, status=400)

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
@api_view(['POST'])
def get_user_movie_lists(request):
    index = request.data['amount']
    movie_list = MovieList.objects.all()[:index]
    serializer = MovieListSerializer(movie_list, many=True)
    string = f"THIS IS TEH AUTHOR{movie_list[1].author}"
    print(string)
    return Response(serializer.data)


@api_view(['POST'])
def search_user_movie_lists(request):
    search_query = request.data.get('content')
    movie_list = MovieList.objects.filter(
        Q(title__icontains=search_query) | Q(author__username__icontains=search_query)
    )
    serializer = MovieListSerializer(movie_list, many=True)
    return JsonResponse(serializer.data, safe=False)










def home(request):
    movie_list = Movie.objects.order_by("-release_date")[:10]
    return render(request, "app/home.html", {"movie_list": movie_list})


def search(request):
    if request.method == "GET":
        form = SearchForm(request.GET)
        if form.is_valid():
            query = form.cleaned_data["query"]
            search_type = form.cleaned_data["search_type"]

            if search_type == "movie":
                results = Movie.objects.filter(title__icontains=query)
            elif search_type == "user":
                results = Review.objects.filter(author__username__icontains=query)

            return render(
                request,
                "app/home.html",
                {"results": results, "search_type": search_type, "form": form},
            )
    else:
        form = SearchForm()

    return render(request, "app/home.html", {"form": form})
def increment_years(years):
    result = []
    for year_range in years:
        start_year = int(year_range)
    
        # Generate a list of years in string form
        year_strings = [str(year) for year in range(start_year, start_year + 10)]

        # Extend the result array with the generated year strings
        result.extend(year_strings)
    return result
