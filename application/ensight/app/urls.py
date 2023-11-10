from django.urls import path, include
from knox import views as knox_views
from .views import *

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', home, name='home'),
    path('search/', search, name='search'),
    path('fetch_movies/', fetch_movies, name='fetch_movies'),
    path('get_user_movie_lists/', get_user_movie_lists, name='get_user_movie_lists'),
    path('create_movie_list/', create_movie_list, name='create_movie_list'),
    path('search_movies/', search_movies, name='search_movies'),
    path('search_users/', search_users, name='search_users'),
    path('header_search/', header_search, name='header_search'),
    path('get_users/', get_users, name='get_users'),
    path('search_user_movie_lists/', search_user_movie_lists, name='search_user_movie_lists'),
    path('', include('knox.urls')),
    path('accounts/register', RegisterAPI.as_view()),
    path('accounts/current_user', CurrentUserAPI.as_view()),
    path('accounts/login', LoginAPI.as_view()),
    path('accounts/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)