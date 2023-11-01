from django.urls import path
from .views import *

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', home, name='home'),
    path('search/', search, name='search'),
    path('hello-webpack/', TemplateView.as_view(template_name='app/hello_webpack.html')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
