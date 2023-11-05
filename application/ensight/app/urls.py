from django.urls import path
from .views import *

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', home, name='home'),
    path('search/', search, name='search'),
    path('hello-webpack/', TemplateView.as_view(template_name='app/hello_webpack.html')),
    path('test_fetch_first_movie/', test_fetch_first_movie, name='test_fetch_first_movie'),
    path('get_all_user_list/', get_all_user_list, name='get_all_user_list'),
    path('create_movie_list/', create_movie_list, name='create_movie_list'),
    path('search_movies/', search_movies, name='search_movies'),



] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
