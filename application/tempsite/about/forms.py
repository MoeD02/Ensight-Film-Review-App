from django import forms

# class MovieSearchForm(forms.Form):
#     search_query = forms.CharField(label='Search Movies', max_length=100)
from django import forms

class SearchForm(forms.Form):
    query = forms.CharField(label='Search', max_length=100)
    search_type = forms.ChoiceField(
        choices=[('movie', 'Movies'), ('user', 'Users')],
        initial='movie'
    )
