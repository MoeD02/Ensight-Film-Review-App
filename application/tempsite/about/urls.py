from django.urls import path
from .views import *

urlpatterns = [
  path('', index, name='home'),
  # path('', HomeView.as_view(), name='home'),
  path('alex/', AlexView.as_view(), name='alex'),
  path('pragati/', PragatiView.as_view(), name='pragati'),
  path('mohammad/', MohammadView.as_view(), name='mohammad'),
  path('sarah/', SarahView.as_view(), name='sarah'),
  path('christian/', ChristianView.as_view(), name='christian'),
  path('search/', search, name='search'),
]
