from django.urls import path
from . import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.home, name='home'),
    path('search/', views.search, name='search'),
    path('api/register', views.UserRegister.as_view(), name='register'),
    path('api/login', views.UserLogin.as_view(), name='login'),
    path('api/logout', views.UserLogout.as_view(), name='logout'),
    path('api/user', views.UserView.as_view(), name='user'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
