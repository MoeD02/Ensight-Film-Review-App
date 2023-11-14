import json
import requests

url = "https://api.themoviedb.org/3/genre/movie/list?lang=en"

with open("./tmdb_API_key.txt", "r") as f:
    token = f.read().strip()

headers = {
    "accept": "application/json",
    "Authorization": "Bearer " + token,
}

response = requests.get(url, headers=headers)

data = response.json()

formatted_data = []

for e in data['genres']:
    temp = {}
    temp['model'] = "app.genre"
    temp['pk'] = e['id']
    temp['fields'] = {
        'name': e['name']
    }
    formatted_data.append(temp)

with open('./application/ensight/app/fixtures/genre_fixture.json', 'w') as f:
    json.dump(formatted_data, f, indent=2)