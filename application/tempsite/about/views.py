from django.shortcuts import render
from django.views.generic.base import TemplateView
from .forms import SearchForm
# For ALEX: IMPORT MODELS HERE
# Create your views here.
class HomeView(TemplateView):
    #template_name = 'about/about.html'
    template_name = 'about/home.html'

class AlexView(TemplateView):
    template_name = 'about/alex.html'

class PragatiView(TemplateView):
    template_name = 'about/pragati.html'

class MohammadView(TemplateView):
    template_name = 'about/mohammad.html'

class SarahView(TemplateView):
    template_name = 'about/sarah.html'

class ChristianView(TemplateView):
    template_name = 'about/christian.html'

# def search_movies(request):
#     if request.method == 'GET':
#         form = MovieSearchForm(request.GET)
#         if form.is_valid():
#             #FOR ALEX: This should return whatever the user searched
#             search_query = form.cleaned_data['search_query']
#             # FOR ALEX: Here you would do the search and whatever you find will be returned into movies. Everything next to the "=" is dummy code
#             movies = Movie.objects.filter(title__icontains=search_query)
#             context = {'movies': movies, 'form': form}
#             return render(request, 'search_results.html', context)
#     else:
#         form = MovieSearchForm()
#     return render(request, 'home.html', {'form': form})



def search(request):
    if request.method == 'GET':
        form = SearchForm(request.GET)
        if form.is_valid():
            #FOR ALEX: This should return whatever the user searched
            query = form.cleaned_data['query']
            #FOR ALEX: This should return whatever the type the user search for was
            # either movie or user
            search_type = form.cleaned_data['search_type']

            if search_type == 'movie':
                # FOR ALEX: Here you would do the search and whatever you find will be returned into results. Everything next to the "=" is dummy code
                results = Movie.objects.filter(title__icontains=query)
            elif search_type == 'user':
                # FOR ALEX: Here you would do the search and whatever you find will be returned into results. Everything next to the "=" is dummy code
                results = User.objects.filter(username__icontains=query)
            # Render the search_results html page if the user did a GET request 
            return render(request, 'search_results.html', {'results': results, 'search_type': search_type, 'form': form})
    else:
        form = SearchForm()
    #Return the home page if the user didn't do a get request
    return render(request, 'home.html', {'form': form})
