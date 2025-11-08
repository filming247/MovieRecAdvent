"""
This file defines the FastAPI app for the API and all of its routes.
To run this API, use the FastAPI CLI
$ fastapi dev src/api.py
"""

import random
import requests
from fastapi import FastAPI
import json
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

    dictionary1 = {'genres': ['Action', 'Animation' ], 'rating': 9,  'duration': 90,'release_date': '2020-01-01', 'requested': 6}
    genres = dictionary1['genres']
    rating = dictionary1['rating']
    duration = dictionary1["duration"]
    release_date = dictionary1["release_date"]
    requested = dictionary1['requested']
    
    genre_dict = {
    "Action": 28,
    "Abenteuer": 12,
    "Animation": 16,
    "Komödie": 35,
    "Krimi": 80,
    "Dokumentarfilm": 99,
    "Drama": 18,
    "Familie": 10751,
    "Fantasy": 14,
    "Historie": 36,
    "Horror": 27,
    "Musik": 10402,
    "Mystery": 9648,
    "Liebesfilm": 10749,
    "Science Fiction": 878,
    "TV-Film": 10770,
    "Thriller": 53,
    "Kriegsfilm": 10752,
    "Western": 37
}


    genre_string = '&with_genres='
    for genre in genres:
        genre_string = genre_string + str(genre_dict[genre]) + ','
    
    

        

    url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
    url += genre_string[:-1]
    if rating:
        url = url + '&vote_average.gte=' + str(rating)
    if duration:
        url = url + 'with_runtime.lte=' + str(duration)
    if release_date:
        url = url + 'primary_release_date.lte' + release_date

    #url = url + 'vote_count.gte=100'
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGQ3MzY5MjlhNTc4NDA1MjE5MTNjNmM3MmViNjU1OSIsIm5iZiI6MTc2MjYyNTEyOC40MjEsInN1YiI6IjY5MGY4NjY4YWVlMjM1YTFkZjMxYWIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANELYRpnzbHR_3kUDw68eMHO6_TVhbsC8fP9Y7r-ufI"
    }

    response = requests.get(url, headers=headers)
    json_store = json.loads(response.text)
    
    num_items_to_select = random.randint(1, requested)

# 2. Shuffle the original list (create a copy to avoid modifying the original)
    shuffled_list = json_store['results'][:] # Create a shallow copy
    random.shuffle(shuffled_list)

    # 3. Select the desired number of items
    random_selection = shuffled_list[:num_items_to_select]  
    print(random_selection)
    return json_store['results']




@app.post("/submit")
async def hello() -> dict[str, str]:
    """Get hello message."""
    get_discovery()



    return {"message": "Hello from FastAPI"}