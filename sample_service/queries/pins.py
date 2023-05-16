from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date


class Error(BaseModel):
    message: str


class LocationIn(BaseModel):
    name: str
    longitude: float
    lattitude: float


class ConditionsIn(BaseModel):
    sunny: int
    windy: int
    crowded: int
    cloudy: int


class PinIn(BaseModel):
    username: str
    location: LocationIn
    conditions: ConditionsIn
    date: datetime.datetime
    image_url: str 