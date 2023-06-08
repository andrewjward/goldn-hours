from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import requests
from authenticator import authenticator
from routers import accounts, pins


description = "Gold'n Hours is THE app for photographers looking to maximize "
"their productivity!"

app = FastAPI(
    title="Gold'n Hours",
    description=description,
    version="0.0.1",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Squad-core, featuring: J-THON, Dara Structures, 1st place "
        "A-Ward, and Craig the Master",
        "url": "https://gitlab.com/jonathanrblazer/module3-project-gamma",
        "email": "squad-core@email.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    redoc_url="/goldn",
    docs_url="/hours-docs",
)


origins = [
    os.environ.get("PUBLIC_URL", None),
    os.environ.get("REACT_APP_SAMPLE_SERVICE_API_HOST", None),
    os.environ.get("CORS_HOST", None),
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def health_check():
    return {"Hello": "World!!!"}


app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(pins.router)


@app.get("/geocode")
async def geocode(address: str):
    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": os.environ["GOOGLE_MAPS_API_KEY"],
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()
