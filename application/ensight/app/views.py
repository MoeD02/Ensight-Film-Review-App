import json
from django.db import IntegrityError


from .serializers import *
from .models import *
from django.contrib.auth import get_user_model

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response

from knox.models import AuthToken
from knox.auth import TokenAuthentication
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.db.models import Q
from django.contrib.auth import get_user_model


User = get_user_model()


class RegisterAPI(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)


        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "user": serializer.data,
                    "token": "Token " + AuthToken.objects.create(user)[1],
                }
            )
        return Response({"errors": serializer.errors}, status.HTTP_400_BAD_REQUEST)


class LoginAPI(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)


        if serializer.is_valid():
            user = serializer.validated_data
            return Response(
                {
                    "user": UserSerializer(user).data,
                    "token": "Token " + AuthToken.objects.create(user)[1],
                }
            )
        return Response({"errors": "Invalid Credentials"}, status.HTTP_400_BAD_REQUEST)


class CurrentUserAPI(RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer


    def get_object(self):
        return self.request.user


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def follow_user(request):
    # TODO: Get User obj from auth info
    # user_id = request.data.get("user_id")
    user_id = request.user.pk
    following_user_id = request.data.get("other_user_id")
    try:
        UserFollowing.objects.create(
            user_id=User.objects.get(pk=user_id),
            following_user_id=User.objects.get(pk=following_user_id),
        )
        return Response({"message": "Follow success"}, status.HTTP_200_OK)
    except IntegrityError:
        return Response({"error": "error"}, status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def unfollow_user(request):
    # TODO: Get User obj from auth info
    # user_id = request.data.get("user_id")
    user_id = request.user.pk
    following_user_id = request.data.get("other_user_id")
    try:
        UserFollowing.objects.filter(
            user_id=User.objects.get(pk=user_id),
            following_user_id=User.objects.get(pk=following_user_id),
        ).delete()
        return Response({"message": "success"}, status.HTTP_200_OK)
    except IntegrityError:
        return Response({"error": "error"}, status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def add_to_favorites(request):
    if request.method == "POST":
        movie_id = request.data.get("movie_id")
        user_profile = request.user.profile


        # Check if the movie is already in the user's favorites
        if user_profile.favorites.filter(pk=movie_id).exists():
            return JsonResponse({"message": "Movie already in favorites"}, status=400)

        try:
            movie = Movie.objects.get(pk=movie_id)
            user_profile.favorites.add(movie)
            user_profile.save()
        except Movie.DoesNotExist:
            return JsonResponse({"error": "Movie not found"}, status=404)
        # Add the movie to the user's favorites
        

        return JsonResponse(
            {"message": "Movie added to favorites successfully"}, status=200
        )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def remove_from_favorites(request):
    if request.method == "POST":
        movie_id = request.data.get("movie_id")
        user_profile = request.user.profile

        try:
            movie = Movie.objects.get(pk=movie_id)
        except Movie.DoesNotExist:
            return JsonResponse({"error": "Movie not found"}, status=404)

        # Check if the movie is in the user's favorites
        if user_profile.favorites.filter(pk=movie_id).exists():
            print(user_profile.favorites.filter(pk=movie_id).exists())
            # Remove the movie from the user's favorites
            user_profile.favorites.remove(movie)
            return JsonResponse(
                {"message": "Movie removed from favorites successfully"}, status=200
            )
        else:
            return JsonResponse({"message": "Movie not found in favorites"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def update_user_profile(request):
    user_profile = request.user.profile

    # Get the data from the request
    new_username = request.data.get("new_username")
    new_bio = request.data.get("new_bio")
    new_avatar = request.data.get("new_avatar")

    # Update fields if new values are provided
    if new_username:
        request.user.username = new_username
        request.user.save()

    if new_bio:
        user_profile.bio = new_bio
        user_profile.save()

    if new_avatar:
        user_profile.avatar = request.FILES["new_avatar"]
        user_profile.save()

    # Return a response indicating success
    return Response({"message": "User profile updated successfully"})

@api_view(["POST"])
def add_to_watchlist(request):
    if request.method == "POST":
        movie_id = request.data.get("movie_id")
        user_profile = request.user.profile

        try:
            movie = Movie.objects.get(pk=movie_id)
        except Movie.DoesNotExist:
            return JsonResponse({"error": "Movie not found"}, status=404)

        # Check if the movie is already in the user's watchlist
        if movie in user_profile.watchlist.all():
            return JsonResponse({"message": "Movie already in watchlist"}, status=200)

        # Add the movie to the user's watchlist
        user_profile.watchlist.add(movie)
        user_profile.save()

        return JsonResponse(
            {"message": "Movie added to watchlist successfully"}, status=200
        )
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)


@api_view(["POST"])
def remove_from_watchlist(request):
    if request.method == "POST":
        movie_id = request.data.get("movie_id")
        user_profile = request.user.profile

        try:
            movie = Movie.objects.get(pk=movie_id)
        except Movie.DoesNotExist:
            return JsonResponse({"error": "Movie not found"}, status=404)

        # Check if the movie is in the user's watchlist
        if user_profile.watchlist.filter(pk=movie_id).exists():
            # Remove the movie from the user's watchlist
            user_profile.watchlist.remove(movie)
            return JsonResponse(
                {"message": "Movie removed from watchlist successfully"}, status=200
            )
        else:
            return JsonResponse({"message": "Movie not found in watchlist"}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)



@api_view(["POST"])
def header_search(request):
    if request.method == "POST":
        search_query = request.data.get("content")
        print("Search Query: ", search_query)
        movie_results = Movie.objects.filter(Q(title__icontains=search_query))
        movie_serializer = MovieSerializer(movie_results, many=True)

        review_results = Review.objects.filter(
            Q(title__icontains=search_query)
            | Q(text__icontains=search_query)  # Search by title (case-insensitive)
            | Q(  # Search by text (case-insensitive)
                author__username__icontains=search_query
            )  # Search by author's username (case-insensitive)
            # You can add more criteria based on your needs
        )

        reviews_serializer = ReviewSerializer(review_results, many=True)

        users_results = Profile.objects.filter(
            Q(user__username__icontains=search_query)
        )

        user_serializer = ProfileSerializer(users_results, many=True)

        data = {
            "movies": movie_serializer.data,
            "reviews": reviews_serializer.data,
            "users": user_serializer.data,
        }

        return Response(data)


@api_view(["POST"])
def fetch_movies(request):
    filter = request.data.get("filter")
    genres = request.data.get("genres")
    years = request.data.get("years")
    if years:
        years = increment_years(years)
    index = request.data.get("amount")

    movies = Movie.objects.all().defer("description")
    if genres:
        movies = movies.filter(genres__name__in=genres).distinct()

    if years:
        movies = movies.filter(release_date__year__in=years)

    if filter == "highest":
        movies = movies.order_by("-popularity")[:index]
    elif filter == "ALL":
        movies = movies[:index]
    elif filter == "lowest":
        movies = movies.order_by("popularity")[:index]
    serializer = MovieSerializer(movies, many=True)

    return Response(serializer.data)


@api_view(["POST"])
def search_movies(request):
    if request.method == "POST":
        filter = request.data.get("filter")
        genres = request.data.get("genres")
        years = request.data.get("years")
        years = increment_years(years)
        search_query = request.data.get("content")

        # Search for movies that match the query in their title or description
        search_results = Movie.objects.filter(Q(title__icontains=search_query))

        if years:
            search_results = search_results.filter(release_date__year__in=years)
        if genres:
            search_results = search_results.filter(genres__name__in=genres).distinct()
        else:
            search_results = search_results.all()

        if filter == "highest":
            search_results = search_results.order_by("-popularity")
        elif filter == "lowest":
            search_results = search_results.order_by("popularity")
        serializer = MovieSerializer(search_results, many=True)
        return Response(serializer.data)


@api_view(["POST"])
def get_movie_details(request):
    id = request.data.get("id")
    if id:
        movie = get_object_or_404(Movie, id=id)
        serializer = MovieSerializer(movie, many=False)
        return Response(serializer.data)

@api_view(["GET"])
def get_users_favorites(request):
    key = request.query_params.get("id")
    favorite_movies = Profile.objects.get(pk=key).favorites.all()[:10]
    return Response(MovieSerializer(favorite_movies, many=True).data)

@api_view(["POST"])
def fetch_movies_by_ids(request):
    if request.method == "POST":
        movie_ids = request.data.get("movie_ids", [])

        # Retrieve movie objects based on the provided IDs
        movies = Movie.objects.filter(pk__in=movie_ids)

        # Check if all movies were found
        if movies.count() == len(movie_ids):
            # Serialize the movie objects using MovieSerializer
            serializer = MovieSerializer(movies, many=True)
            serialized_movies = serializer.data

            return Response({"movies": serialized_movies})
        else:
            return Response({"error": "One or more movies not found"}, status=400)
    else:
        return Response({"error": "Invalid request method"}, status=400)


@api_view(["POST"])
def get_users(request):
    filter = request.data.get("filter")
    if filter == "ALL":
        users = Profile.objects.all()
        serializer = ProfileSerializer(users, many=True)
    else:
        index = request.data["amount"]
        users = Profile.objects.all()[:index]
        serializer = ProfileSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def search_users(request):
    if request.method == "POST":
        search_query = request.data.get("content")
        print(f"Search Query: {search_query}")
        users = Profile.objects.filter(Q(user__username__icontains=search_query))

        serializer = ProfileSerializer(users, many=True)
        user_profiles = [
            {
                "username": user.user.username,
            }
            for user in users
        ]
        return Response(serializer.data)
    # else:
    #     return JsonResponse({'error': 'Invalid request method'}, status=400)


@api_view(["POST"])
def get_user_profile_by_id(request):
    user_id = int(request.data.get("id"))  # Assuming the frontend sends the user ID in the request data
    if user_id:
        try:
            # Fetch the user profile using the provided ID
            user_profile = Profile.objects.get(user__pk=user_id)
            print("PROFILE",user_profile)
            # Serialize the user profile data
            serializer = ProfileSerializer(user_profile)

            # Return the serialized user profile data as JSON response
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return JsonResponse({"error": "User profile not found"}, status=404)
    else:
        return JsonResponse(
            {"error": "Invalid request, user ID not provided"}, status=400
        )


# This allows users to create a list with whatever movies they want
@api_view(["POST"])
def create_movie_list(request):
    if request.method == "POST":
        serializer = CreateMovieListSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new movie list
            movie_list = serializer.save()
            movie_ids = request.data.get("movie_ids", [])
            for movie_id in movie_ids:
                movie = Movie.objects.get(pk=movie_id)
                MovieListThrough.objects.create(movie=movie, movie_list=movie_list)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# fetch username, user's bio and user's privacy status
# def getUserInfo(request):


# get's user's list(all of it). STILL NEEDS WORK because it doesn't know which user it is
@api_view(["POST"])
def get_user_movie_lists(request):
    filter = request.data.get("filter")

    # print("THIS IS THE FILTER AND THIS IS THE ID: ", filter, author_id)

    if filter == "id":
        author_id = request.data["id"]
        movie_list = MovieList.objects.filter(author__id=author_id)
    else:
        index = request.data["amount"]
        movie_list = MovieList.objects.all()[:index]
        # string = f"THIS IS TEH AUTHOR{movie_list[0].author}"
        # print(string)

    serializer = MovieListSerializer(movie_list, many=True)
    return Response(serializer.data)


@api_view(["POST"])
# @permission_classes([permissions.IsAuthenticated])
def get_user_stats(request):
    if request.method == "POST":
        user_id = request.data.get("user_id")

        # Check if the user_id is provided
        if not user_id:
            return JsonResponse(
                {"error": "Incomplete data. Please provide user_id."},
                status=400,
            )

        user = get_object_or_404(User, id=user_id)

        # Get the number of movie lists owned by the user
        num_movie_lists = MovieList.objects.filter(author=user).count()
        num_movies_liked = user.profile.favorites.count()
        num_following = user.following.count()
        num_followers = user.followers.count()

        return JsonResponse(
            {
                "num_movie_lists": num_movie_lists,
                "num_movies_liked": num_movies_liked,
                "num_following": num_following,
                "num_followers": num_followers,
            }
        )

    return JsonResponse({"error": "Invalid request method"}, status=400)


@api_view(["POST"])
def search_user_movie_lists(request):
    search_query = request.data.get("content")
    movie_list = MovieList.objects.filter(
        Q(title__icontains=search_query) | Q(author__username__icontains=search_query)
    )
    serializer = MovieListSerializer(movie_list, many=True)
    return JsonResponse(serializer.data, safe=False)


from django.http import JsonResponse


@api_view(["POST"])
def get_list_details(request):
    id = request.data.get("id")
    if id:
        movie_list = get_object_or_404(MovieList, id=id)
        serializer = MovieListSerializer(movie_list, many=False)
        return Response(serializer.data)


@api_view(["POST"])
def user_likes_movie(request):
    user_id = request.data.get("user_id")
    movie_id = request.data.get("movie_id")
    data = Profile.objects.get(pk=user_id).favorites.filter(pk=movie_id).exists()
    return JsonResponse(
        {
            "data": data,
        }
    )


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def user_follows_user(request):
    user_id = request.data.get("follower_id")
    other_id = request.data.get("following_id")

    # Check if the follower_id and following_id are provided
    if not user_id or not other_id:
        return JsonResponse(
            {
                "error": "Incomplete data. Please provide both user_id and other_id."
            },
            status=400,
        )

    # Check if the specified follower exists
#    follower_profile = get_object_or_404(Profile, pk=follower_id)

    # Check if the specified following user exists
#    following_profile = get_object_or_404(Profile, pk=following_id)

    # Check if the specified follower is following the specified following user
#    is_following = follower_profile.following.filter(pk=following_id).exists()
    is_following = User.objects.get(pk=user_id).followers.filter(pk=other_id).exists()
    # Return the result as a JSON response
    return JsonResponse({"is_following": is_following})



def increment_years(years):
    result = []
    for year_range in years:
        start_year = int(year_range)

        # Generate a list of years in string form
        year_strings = [str(year) for year in range(start_year, start_year + 10)]

        # Extend the result array with the generated year strings
        result.extend(year_strings)
    return result


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def write_review(request):
    if request.method == "POST":
        user = request.user
        movie_id = request.data.get("movie_id")
        text = request.data.get("text")
        rating = request.data.get("rating", 0)

        # Validate the input data
        if not movie_id or not text:
            return Response(
                {"error": "Incomplete data. Please provide movie_id and text."},
                status=400,
            )

        try:
            # Check if the movie exists
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found."}, status=404)

        # Create a new review
        new_review = Review.objects.create(
            author=user, movie=movie, text=text, rating=rating
        )

        # Serialize and return the new review
        serializer = ReviewSerializer(new_review)
        return Response(
            {"message": "Review created successfully", "review": serializer.data},
            status=201,
        )

    return Response({"error": "Invalid request method"}, status=400)


@api_view(["POST"])
def fetch_reviews_for_movie(request):
    if request.method == "POST":
        movie_id = request.data.get("movie_id")

        # Validate the input data
        if not movie_id:
            return Response(
                {"error": "Incomplete data. Please provide movie_id."},
                status=400,
            )

        try:
            # Check if the movie exists
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found."}, status=404)

        # Fetch reviews for the given movie
        reviews = Review.objects.filter(movie=movie)

        # Serialize and return the reviews
        serializer = ReviewSerializer(reviews, many=True)
        return Response({"reviews": serializer.data})

    return Response({"error": "Invalid request method"}, status=400)


@api_view(["POST"])
def get_users(request):
    filter = request.data.get("filter")
    if filter == "ALL":
        users = Profile.objects.all()
        serializer = ProfileSerializer(users, many=True)
    else:
        index = request.data["amount"]
        users = Profile.objects.all()[:index]
        serializer = ProfileSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def search_users(request):
    if request.method == "POST":
        search_query = request.data.get("content")
        print(f"Search Query: {search_query}")
        users = Profile.objects.filter(Q(user__username__icontains=search_query))

        serializer = ProfileSerializer(users, many=True)
        user_profiles = [
            {
                "username": user.user.username,
            }
            for user in users
        ]
        return Response(serializer.data)
    # else:
    #     return JsonResponse({'error': 'Invalid request method'}, status=400)


# @api_view(["POST"])
# def get_user_profile_by_id(request):
#     user_id = request.data.get(
#         "id"
#     )  # Assuming the frontend sends the user ID in the request data
#     if user_id:
#         try:
#             # Fetch the user profile using the provided ID
#             user_profile = Profile.objects.get(pk=user_id)
#             # Serialize the user profile data
#             # serializer = ProfileSerializer(user_profile)

#             # Return the serialized user profile data as JSON response
#             # return Response(serializer.data)
#             return JsonResponse(
#                 {
#                     "name": user_profile.user.username,
#                     "favorites": serializers.serialize("json", user_profile.favorites.all()),
#                     "watchlist": serializers.serialize("json", user_profile.watchlist.all()),
#                     "bio": user_profile.bio,
#                     "avatar": user_profile.avatar,
#                 }
#             )
#         except Profile.DoesNotExist:
#             return JsonResponse({"error": "User profile not found"}, status=404)
#     else:
#         return JsonResponse(
#             {"error": "Invalid request, user ID not provided"}, status=400
        # )


# This allows users to create a list with whatever movies they want
@api_view(["POST"])
def create_movie_list(request):
    if request.method == "POST":
        serializer = CreateMovieListSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new movie list
            movie_list = serializer.save()
            movie_ids = request.data.get("movie_ids", [])
            for movie_id in movie_ids:
                movie = Movie.objects.get(pk=movie_id)
                MovieListThrough.objects.create(movie=movie, movie_list=movie_list)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# fetch username, user's bio and user's privacy status
# def getUserInfo(request):


# get's user's list(all of it). STILL NEEDS WORK because it doesn't know which user it is
@api_view(["POST"])
def get_user_movie_lists(request):
    filter = request.POST.get("filter")

    # print("THIS IS THE FILTER AND THIS IS THE ID: ", filter, author_id)

    if filter == "id":
        author_id = request.POST.get("id")
        movie_list = MovieList.objects.filter(author__id=author_id)
    else:
        index = request.POST.get("amount")
        movie_list = MovieList.objects.all()[:index]
        # string = f"THIS IS TEH AUTHOR{movie_list[0].author}"
        # print(string)

    serializer = MovieListSerializer(movie_list, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def search_user_movie_lists(request):
    search_query = request.data.get("content")
    movie_list = MovieList.objects.filter(
        Q(title__icontains=search_query) | Q(author__username__icontains=search_query)
    )
    serializer = MovieListSerializer(movie_list, many=True)
    return JsonResponse(serializer.data, safe=False)


from django.http import JsonResponse


@api_view(["POST"])
def get_list_details(request):
    id = request.data.get("id")
    if id:
        movie_list = get_object_or_404(MovieList, id=id)
        serializer = MovieListSerializer(movie_list, many=False)
        return Response(serializer.data)


