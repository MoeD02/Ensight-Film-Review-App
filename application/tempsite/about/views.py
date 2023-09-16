from django.shortcuts import render
from django.views.generic.base import TemplateView

# Create your views here.
class IndexView(TemplateView):
    template_name = 'about/about.html'

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
