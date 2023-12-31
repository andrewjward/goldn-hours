from .client import Queries
from models.pins import PinIn, PinOut
from bson.objectid import ObjectId
from typing import List
from geopy.distance import distance


class PinsQueries(Queries):
    DB_NAME = "Gold'n-Hours"
    COLLECTION = "pins"

    def create_pin(self, pin: PinIn) -> PinOut:
        props = pin.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return PinOut(**props)

    def get_all_pins(self) -> List[PinOut]:
        db = self.collection.find()
        pins = []
        for pin in db:
            pin["id"] = str(pin["_id"])
            pins.append(PinOut(**pin))
        return pins

    def get_user_pins(self, username: str) -> List[PinOut]:
        db = self.collection.find({"username": username})
        pins = []
        for pin in db:
            pin["id"] = str(pin["_id"])
            pins.append(PinOut(**pin))
        return pins

    def get_by_location(self, lat: float, long: float, radius: float):
        center_point = (lat, long)
        db = self.collection.find()
        pins = []
        for pin in db:
            if (
                distance(
                    center_point, (pin["latitude"], pin["longitude"])
                ).miles
                <= radius
            ):
                pin["id"] = str(pin["_id"])
                pins.append(PinOut(**pin))
        return pins

    def get_one_pin(self, id: str) -> PinOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return PinOut(**props)

    def delete_pin(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})
