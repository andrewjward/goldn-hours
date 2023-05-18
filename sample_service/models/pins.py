from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date, datetime
from .pydantic_object import PydanticObjectId


class Error(BaseModel):
    message: str


class PinIn(BaseModel):
    username: str

    #location
    location_name: str
    longitude: float
    latitude: float

    #conditions
    sunny: int
    windy: int
    crowded: int
    cloudy: int

    #info
    date: datetime
    image_url: str


class Pin(PinIn):
    id: PydanticObjectId


class PinOut(PinIn):
    id: str
