from django.shortcuts import render
from django.views.generic.base import TemplateView
from .forms import SearchForm
from .models import *
from django.http import JsonResponse

class HomeView(TemplateView):
    template_name = 'app/home.html'

def test_fetch(request):
    # Create a sample JSON response
    data = {'message': 'This is a test fetch response'}

    return JsonResponse(data)
def home(request):
    movie_list = Movie.objects.order_by('-release_date')[:10]
    return render(request, 'app/home.html', {'movie_list': movie_list})

def search(request):
    if request.method == 'GET':
        form = SearchForm(request.GET)
        if form.is_valid():
            query = form.cleaned_data['query']
            search_type = form.cleaned_data['search_type']
            
            if search_type == 'movie':
                results = Movie.objects.filter(title__icontains=query)
            elif search_type == 'user':
                results = Review.objects.filter(author__username__icontains=query)
            
            return render(request, 'app/home.html', {'results': results, 'search_type':search_type, 'form': form})
    else:
        form = SearchForm()
    
    return render(request, 'app/home.html', {'form': form})