from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os, requests
from routers import pins


app = FastAPI()


app.include_router(pins.routers)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }

@app.get("/geocode")
async def geocode(address: str):
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": address, "key": "AIzaSyD0SiphFHbZb8paV9YA3AM_X65d8eAyf-A"}
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()