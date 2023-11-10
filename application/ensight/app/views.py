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

class HomeView(TemplateView):
    template_name = "app/home.html"


def index(request):
    return render(request, 'app/index.html')

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
