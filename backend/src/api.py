"""
This file defines the FastAPI app for the API and all of its routes.
To run this API, use the FastAPI CLI
$ fastapi dev src/api.py
"""

import random
import requests
from fastapi import FastAPI
import json
import urllib
import random

# The app which manages all of the API routes
app = FastAPI()


# The decorator declares the function as a FastAPI route on the given path.
# This route in particular is a GET route at "/hello" which returns the example
# dictionary as a JSON response with the status code 200 by default.
@app.get("/hello")
async def hello() -> dict[str, str]:
    """Get hello message."""
    return {"message": "Hello from FastAPI"}


# The route can also handle query parameters encoded in the URL after the path,
# e.g. `/random?maximum=1000`
# If the value isn't an integer, FastAPI will return an error response
# with a validation error describing the invalid input.
@app.get("/random")
async def get_random_item(maximum: int) -> dict[str, int]:
    """Get an item with a random ID."""
    return {"itemId": random.randint(0, maximum)}



def get_discovery():
    genre_dict = {
        "Action"    : 28,
        "Adventure" : 12,
        "Animation" : 16,
        "Comedy"    : 35,
        "Crime"     : 80,
        "Documentary": 99,
        "Drama"     : 18,
        "Family"    : 10751,
        "Fantasy"   : 14,
        "History"   : 36,
        "Horror"    : 27,
        "Music"     : 10402,
        "Mystery"   : 9648,
        "Romance"   : 10749,
        "Science Fiction": 878,
        "TV Movie"  : 10770,
        "Thriller"  : 53,
        "War"       : 10752,
        "Western"   : 37
    }

    watch_providers = {
        "Netflix"   : 8,
        "Amazon Prime Video": 9,
        "Disney+"   : 337,
        "HBO Max"   : 384,
        "Hulu"      : 15,
        "Apple TV+" : 350,
        "Peacock"   : 386,
        "Paramount+": 531,
        "YouTube"   : 327,
        "Google Play Movies": 3,
        "Vudu"      : 7,
        "Tubi"      : 383,
        "FuboTV"    : 356,
        "Rakuten TV": 387,
        "Sling TV"  : 356
    }
    
    dictionary1 = {'with_genres'            : ['Action', 'Animation'],
                   'vote_average.gte'       : 9,
                   'with_runtime.lte'       : 90,
                   'release_date'           : '2020-01-01',
                   'primary_release_date.lte': 6,
                   'with_watch_providers'   : ['Netflix', 'Disney+'],
                   'num_results'            : 10}
    
    dictionary1['with_genres'] = str([genre_dict[x] for x in dictionary1['with_genres']])[1:-1].replace(' ', '')
    dictionary1['with_watch_providers'] = str([watch_providers[x] for x in dictionary1['with_watch_providers']])[1:-1].replace(', ', '|')
    num_results = dictionary1["num_results"]
    del dictionary1["num_results"]

    url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&" \
            + urllib.parse.urlencode(dictionary1)

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGQ3MzY5MjlhNTc4NDA1MjE5MTNjNmM3MmViNjU1OSIsIm5iZiI6MTc2MjYyNTEyOC40MjEsInN1YiI6IjY5MGY4NjY4YWVlMjM1YTFkZjMxYWIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANELYRpnzbHR_3kUDw68eMHO6_TVhbsC8fP9Y7r-ufI"
    }

    response = requests.get(url, headers=headers)
    json_store = json.loads(response.text)

    # Shuffle the original list (create a copy to avoid modifying the original)
    shuffled_list = json_store['results'][:] # Create a shallow copy
    random.shuffle(shuffled_list)

    # Select the desired number of items
    random_selection = shuffled_list[:num_results]
    print([x["title"] for x in random_selection])
    return random_selection




@app.post("/submit")
async def hello() -> dict[str, str]:
    """Get hello message."""
    return {get_discovery()}