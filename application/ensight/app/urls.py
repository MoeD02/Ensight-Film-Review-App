from django.urls import path
from .views import *

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', home, name='home'),
    path('search/', search, name='search')
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
