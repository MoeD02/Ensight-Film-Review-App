from django.urls import path
from . import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.home, name='home'),
    path('search/', views.search, name='search'),
    path('api/register', views.UserCreate.as_view(), name='account-create'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
