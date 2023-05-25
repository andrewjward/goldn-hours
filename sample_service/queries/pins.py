from .client import Queries
from models.pins import PinIn, PinOut, Pin
from bson.objectid import ObjectId
from typing import List


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

    def get_one_pin(self, id: str) -> PinOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if not props:
            return None
        props["id"] = str(props["_id"])
        return PinOut(**props)

    def delete_pin(self, id: str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})
