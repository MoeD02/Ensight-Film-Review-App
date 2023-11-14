import json
import requests

# TODO: make filepaths relative to project directory (except keyfile)

# Base url for API request
base_url = "https://api.themoviedb.org/3/movie/"

# Get API credentials from local file
with open("./tmdb_API_key.txt", "r") as keyfile:
    token = keyfile.read().strip()

headers = {
    "accept": "application/json",
    "Authorization": "Bearer " + token,
}

"""
Open dump of movie ids downloaded from:
    http://files.tmdb.org/p/exports/movie_ids_{month}_{day}_{year}.json.gz
Each line is expected to be a valid JSON object (NOT the entire file).
Request data from TMDB for each movie ID and fill properly formatted dictionary
to generate fixture for Django to instantiate model objects.
"""
formatted_data = []  # Collect formatted dictionaries
with open("./movie_ids_11_13_2023.json", 'r') as infile:
    for line in infile:
        query = json.loads(line)
        if not query['video']:  # video == false -> is a movie
            url = base_url + str(query['id'])
            response = requests.get(url, headers=headers)
            data = response.json()

            temp = {}
            temp['model'] = "app.movie"
            temp['pk'] = data['id']
            temp['fields'] = {
                'title': data['title'],
                'poster_path': data['poster_path'],
                'backdrop_path': data['backdrop_path'] if data['backdrop_path'] else data['poster_path'],
                'genres': [e['id'] for e in data['genres']],
                'release_date': data['release_date'],
                'description': data['overview'],
            }
        formatted_data.append(temp)

# Write to fixtures directory as JSON
with open('./application/ensight/app/fixtures/movie_fixture.json', 'w') as outfile:
    json.dump(formatted_data, outfile, indent=2)  # indent for human-readability
