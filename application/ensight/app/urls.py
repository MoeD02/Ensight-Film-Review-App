from django.urls import path, include
from knox import views as knox_views
from .views import *

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("", home, name="home"),
    path("search/", search, name="search"),
    path("fetch_movies/", fetch_movies, name="fetch_movies"),
    path("get_movie_details/", get_movie_details, name="get_movie_details"),
    path("get_user_movie_lists/", get_user_movie_lists, name="get_user_movie_lists"),
    path("create_movie_list/", create_movie_list, name="create_movie_list"),
    path("search_movies/", search_movies, name="search_movies"),
    path("search_users/", search_users, name="search_users"),
    path("header_search/", header_search, name="header_search"),
    path("get_users/", get_users, name="get_users"),
    path(
        "search_user_movie_lists/",
        search_user_movie_lists,
        name="search_user_movie_lists",
    ),
    path("", include("knox.urls")),
    path("accounts/register", RegisterAPI.as_view()),
    path("accounts/current_user", CurrentUserAPI.as_view()),
    path("accounts/login", LoginAPI.as_view()),
    path("accounts/logout", knox_views.LogoutView.as_view(), name="knox_logout"),
    path(
        "get_user_profile_by_id/", get_user_profile_by_id, name="get_user_profile_by_id"
    ),
    path("fetch_movies_by_ids/", fetch_movies_by_ids, name="fetch_movies_by_ids"),
    path("update_user_profile/", update_user_profile, name="update_user_profile"),
    path("add_to_watchlist/", add_to_watchlist, name="add_to_watchlist"),
    path("remove_from_watchlist/", remove_from_watchlist, name="remove_from_watchlist"),
    path(
        "get_list_details/",
        get_list_details,
        name="get_list_details",
    ),
    path('remove_from_favorites/', remove_from_favorites, name='remove_from_favorites'),
    path('add_to_favorites/', add_to_favorites, name='add_to_favorites'),
    path('user_likes_movie', user_likes_movie)

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
