"""
This file defines the FastAPI app for the API and all of its routes.
To run this API, use the FastAPI CLI
$ fastapi dev src/api.py
"""

import random
import requests
from fastapi import FastAPI
import json

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
    url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGQ3MzY5MjlhNTc4NDA1MjE5MTNjNmM3MmViNjU1OSIsIm5iZiI6MTc2MjYyNTEyOC40MjEsInN1YiI6IjY5MGY4NjY4YWVlMjM1YTFkZjMxYWIzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ANELYRpnzbHR_3kUDw68eMHO6_TVhbsC8fP9Y7r-ufI"
    }

    response = requests.get(url, headers=headers)
    json_store = json.loads(response.text)
    print(json_store['results'])
    return json_store['results']




@app.post("/submit")
async def hello() -> dict[str, str]:
    """Get hello message."""
    get_discovery()



    return {"message": "Hello from FastAPI"}